import { query } from '../config/db.js';

const VALID_CATEGORIES = ['Coffee', 'Non-Coffee', 'Snack', 'Food', 'Dessert'];

export const getAllMenus = async (req, res) => {
  try {
    const { category, available } = req.query;
    const conditions = [];
    const params = [];

    if (category && category !== 'All') {
      params.push(category);
      conditions.push(`category = $${params.length}`);
    }

    if (available !== undefined) {
      params.push(available === 'true');
      conditions.push(`is_available = $${params.length}`);
    }

    let sql = 'SELECT * FROM menus';
    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }
    sql += ' ORDER BY id ASC';

    const result = await query(sql, params);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('[getAllMenus error]:', error);
    return res.status(500).json({ message: 'Gagal mengambil data menu' });
  }
};

export const getMenuById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM menus WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Menu tidak ditemukan' });
    }

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('[getMenuById error]:', error);
    return res.status(500).json({ message: 'Gagal mengambil detail menu' });
  }
};

export const createMenu = async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      img = null,
      description = null,
      is_available = true,
    } = req.body;

    if (!name || !category || price === undefined || price === null) {
      return res.status(400).json({ message: 'Nama, kategori, dan harga wajib diisi' });
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({ message: 'Kategori menu tidak valid' });
    }

    const numericPrice = Number(price);
    if (Number.isNaN(numericPrice) || numericPrice < 0) {
      return res.status(400).json({ message: 'Harga harus berupa angka >= 0' });
    }

    const result = await query(
      `INSERT INTO menus (name, category, price, img, description, is_available)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name.trim(), category, numericPrice, img, description, Boolean(is_available)]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('[createMenu error]:', error);
    return res.status(500).json({ message: 'Gagal menambah menu baru' });
  }
};

export const updateMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const existingRes = await query('SELECT * FROM menus WHERE id = $1', [id]);

    if (existingRes.rows.length === 0) {
      return res.status(404).json({ message: 'Menu tidak ditemukan' });
    }

    const current = existingRes.rows[0];
    const name = req.body.name !== undefined ? String(req.body.name).trim() : current.name;
    const category = req.body.category !== undefined ? req.body.category : current.category;
    const price = req.body.price !== undefined ? Number(req.body.price) : Number(current.price);
    const img = req.body.img !== undefined ? req.body.img : current.img;
    const description = req.body.description !== undefined ? req.body.description : current.description;
    const is_available =
      req.body.is_available !== undefined ? Boolean(req.body.is_available) : current.is_available;

    if (!name || !VALID_CATEGORIES.includes(category) || Number.isNaN(price) || price < 0) {
      return res.status(400).json({ message: 'Data perubahan menu tidak valid' });
    }

    const result = await query(
      `UPDATE menus
       SET name = $1,
           category = $2,
           price = $3,
           img = $4,
           description = $5,
           is_available = $6,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [name, category, price, img, description, is_available, id]
    );

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('[updateMenu error]:', error);
    return res.status(500).json({ message: 'Gagal memperbarui menu' });
  }
};

export const deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM menus WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Menu tidak ditemukan' });
    }

    return res.status(200).json({ message: 'Menu berhasil dihapus', deleted: result.rows[0] });
  } catch (error) {
    console.error('[deleteMenu error]:', error);
    return res.status(500).json({ message: 'Gagal menghapus menu' });
  }
};