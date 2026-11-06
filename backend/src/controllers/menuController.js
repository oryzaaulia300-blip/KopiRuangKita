import { query } from '../config/db.js';

export const getAllMenus = async (req, res, next) => {
  try {
    const { category, search, available } = req.query;

    let sql = 'SELECT * FROM menus WHERE 1=1';
    const params = [];

    if (category && category !== 'All') {
      params.push(category);
      sql += ` AND category = $${params.length}`;
    }

    if (search) {
      params.push(`%${search.toLowerCase()}%`);
      sql += ` AND (LOWER(name) LIKE $${params.length} OR LOWER(description) LIKE $${params.length})`;
    }

    if (available !== undefined) {
      params.push(available === 'true');
      sql += ` AND is_available = $${params.length}`;
    }

    sql += ' ORDER BY category ASC, id ASC';

    const result = await query(sql, params);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });
  } catch (error) {
    next(error);
  }
};

export const getMenuById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await query('SELECT * FROM menus WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Menu dengan ID ${id} tidak ditemukan.`
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

export const createMenu = async (req, res, next) => {
  try {
    const { name, category, price, img, description, is_available = true } = req.body;

    if (!name || !category || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Nama menu, kategori, dan harga wajib diisi.'
      });
    }

    const result = await query(
      `INSERT INTO menus (name, category, price, img, description, is_available)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name.trim(), category, parseFloat(price), img, description, is_available]
    );

    res.status(201).json({
      success: true,
      message: 'Menu berhasil ditambahkan.',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const updateMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, price, img, description, is_available } = req.body;

    const existing = await query('SELECT id FROM menus WHERE id = $1', [id]);
    if (existing.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Menu dengan ID ${id} tidak ditemukan.`
      });
    }

    const result = await query(
      `UPDATE menus
       SET name = COALESCE($1, name),
           category = COALESCE($2, category),
           price = COALESCE($3, price),
           img = COALESCE($4, img),
           description = COALESCE($5, description),
           is_available = COALESCE($6, is_available)
       WHERE id = $7
       RETURNING *`,
      [
        name ? name.trim() : null,
        category || null,
        price !== undefined ? parseFloat(price) : null,
        img || null,
        description || null,
        is_available !== undefined ? is_available : null,
        id
      ]
    );

    res.json({
      success: true,
      message: 'Menu berhasil diperbarui.',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMenu = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM menus WHERE id = $1 RETURNING id, name', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Menu dengan ID ${id} tidak ditemukan.`
      });
    }

    res.json({
      success: true,
      message: `Menu '${result.rows[0].name}' berhasil dihapus.`
    });
  } catch (error) {
    next(error);
  }
};
