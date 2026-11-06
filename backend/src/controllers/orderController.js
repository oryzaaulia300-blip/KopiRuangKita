import { getClient, query } from '../config/db.js';

export const createOrder = async (req, res, next) => {
  const client = await getClient();

  try {
    const {
      orderId,
      order_code,
      customerName,
      customer_name,
      nama,
      tableNumber,
      table_number,
      noMeja,
      phoneNumber,
      phone_number,
      noHp,
      paymentMethod,
      payment_method,
      metode,
      paymentProof,
      payment_proof,
      items,
      subtotal,
      tax,
      pajak,
      total
    } = req.body;

    const finalCustomerName = (customerName || customer_name || nama || '').trim();
    const finalTableNumber = String(tableNumber || table_number || noMeja || '').trim();
    const finalPhoneNumber = String(phoneNumber || phone_number || noHp || '').trim();
    const rawPaymentMethod = (paymentMethod || payment_method || metode || 'QRIS').toUpperCase();
    const finalPaymentProof = paymentProof || payment_proof || null;

    if (!finalCustomerName || !finalTableNumber) {
      return res.status(400).json({
        success: false,
        message: 'Nama pelanggan dan nomor meja wajib diisi.'
      });
    }

    if (!finalPhoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Nomor WhatsApp / telepon wajib diisi.'
      });
    }

    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Pesanan harus memiliki minimal 1 item menu.'
      });
    }

    // Generate unique order code if not provided
    const finalOrderCode = orderId || order_code || `KRK-${Math.floor(100000 + Math.random() * 900000)}`;

    // Validate payment method
    const validMethods = ['QRIS', 'TRANSFER', 'CASH'];
    const finalMethod = validMethods.includes(rawPaymentMethod) ? rawPaymentMethod : 'QRIS';

    // Calculate subtotal, tax, and total if not explicitly provided
    let calculatedSubtotal = 0;
    const validatedItems = items.map((item) => {
      const itemPrice = parseFloat(item.price || 0);
      const itemQty = parseInt(item.quantity || item.qty || 1, 10);
      const itemSubtotal = parseFloat(item.subtotal || itemPrice * itemQty);
      calculatedSubtotal += itemSubtotal;
      return {
        menu_id: item.id || item.menu_id || null,
        name: item.name || item.nama || 'Item',
        price: itemPrice,
        quantity: itemQty,
        subtotal: itemSubtotal
      };
    });

    const finalSubtotal = subtotal !== undefined ? parseFloat(subtotal) : calculatedSubtotal;
    const finalTax = tax !== undefined ? parseFloat(tax) : (pajak !== undefined ? parseFloat(pajak) : finalSubtotal * 0.1);
    const finalTotal = total !== undefined ? parseFloat(total) : (finalSubtotal + finalTax);

    // Initial order status based on payment method
    let initialStatus = 'PENDING';
    if (finalMethod === 'CASH') {
      initialStatus = 'PENDING';
    } else if (finalPaymentProof) {
      initialStatus = 'PROCESSING';
    }

    // START TRANSACTION
    await client.query('BEGIN');

    const orderQuery = `
      INSERT INTO orders (
        order_code,
        customer_name,
        table_number,
        phone_number,
        payment_method,
        payment_proof,
        subtotal,
        tax,
        total,
        status
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING *;
    `;

    const orderResult = await client.query(orderQuery, [
      finalOrderCode,
      finalCustomerName,
      finalTableNumber,
      finalPhoneNumber,
      finalMethod,
      finalPaymentProof,
      finalSubtotal,
      finalTax,
      finalTotal,
      initialStatus
    ]);

    const createdOrder = orderResult.rows[0];

    // Insert order items
    const insertedItems = [];
    for (const item of validatedItems) {
      const itemQuery = `
        INSERT INTO order_items (
          order_id,
          menu_id,
          menu_name,
          price,
          quantity,
          subtotal
        )
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *;
      `;
      const itemResult = await client.query(itemQuery, [
        createdOrder.id,
        item.menu_id,
        item.name,
        item.price,
        item.quantity,
        item.subtotal
      ]);
      insertedItems.push(itemResult.rows[0]);
    }

    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Pesanan berhasil dibuat!',
      order: {
        ...createdOrder,
        items: insertedItems
      }
    });
  } catch (error) {
    await client.query('ROLLBACK');
    next(error);
  } finally {
    client.release();
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const { status, limit = 50, page = 1 } = req.query;

    let sql = `
      SELECT 
        o.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', oi.id,
              'menu_id', oi.menu_id,
              'menu_name', oi.menu_name,
              'price', oi.price,
              'quantity', oi.quantity,
              'subtotal', oi.subtotal
            )
          ) FILTER (WHERE oi.id IS NOT NULL), '[]'
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
    `;

    const params = [];

    if (status) {
      params.push(status.toUpperCase());
      sql += ` WHERE o.status = $${params.length}`;
    }

    sql += ' GROUP BY o.id ORDER BY o.created_at DESC';

    const parsedLimit = Math.min(parseInt(limit, 10) || 50, 100);
    const parsedPage = Math.max(parseInt(page, 10) || 1, 1);
    const offset = (parsedPage - 1) * parsedLimit;

    params.push(parsedLimit, offset);
    sql += ` LIMIT $${params.length - 1} OFFSET $${params.length}`;

    const result = await query(sql, params);

    res.json({
      success: true,
      count: result.rows.length,
      page: parsedPage,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

export const getOrderByCode = async (req, res, next) => {
  try {
    const { orderCode } = req.params;

    const sql = `
      SELECT 
        o.*,
        COALESCE(
          json_agg(
            json_build_object(
              'id', oi.id,
              'menu_id', oi.menu_id,
              'menu_name', oi.menu_name,
              'price', oi.price,
              'quantity', oi.quantity,
              'subtotal', oi.subtotal
            )
          ) FILTER (WHERE oi.id IS NOT NULL), '[]'
        ) as items
      FROM orders o
      LEFT JOIN order_items oi ON o.id = oi.order_id
      WHERE o.order_code = $1 OR o.id::text = $1
      GROUP BY o.id;
    `;

    const result = await query(sql, [orderCode]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Pesanan dengan kode '${orderCode}' tidak ditemukan.`
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['PENDING', 'PAID', 'PROCESSING', 'COMPLETED', 'CANCELLED'];
    const upperStatus = (status || '').toUpperCase();

    if (!validStatuses.includes(upperStatus)) {
      return res.status(400).json({
        success: false,
        message: `Status tidak valid. Pilihan status: ${validStatuses.join(', ')}`
      });
    }

    const result = await query(
      `UPDATE orders 
       SET status = $1 
       WHERE id = $2 OR order_code = $2 
       RETURNING *`,
      [upperStatus, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Pesanan dengan ID/Kode '${id}' tidak ditemukan.`
      });
    }

    res.json({
      success: true,
      message: `Status pesanan berhasil diperbarui menjadi ${upperStatus}.`,
      order: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};
