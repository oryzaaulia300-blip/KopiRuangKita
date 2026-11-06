import { query } from '../config/db.js';

export const getAllPromos = async (req, res, next) => {
  try {
    const { activeOnly } = req.query;

    let sql = 'SELECT * FROM promos';
    const params = [];

    if (activeOnly !== 'false') {
      sql += ' WHERE is_active = TRUE';
    }

    sql += ' ORDER BY id ASC';

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

export const createPromo = async (req, res, next) => {
  try {
    const { title, label, description, price_normal, price_discounted, image_url, is_active = true } = req.body;

    if (!title || !label) {
      return res.status(400).json({
        success: false,
        message: 'Judul dan label promo wajib diisi.'
      });
    }

    const result = await query(
      `INSERT INTO promos (title, label, description, price_normal, price_discounted, image_url, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [title.trim(), label.trim(), description, price_normal, price_discounted, image_url, is_active]
    );

    res.status(201).json({
      success: true,
      message: 'Promo berhasil ditambahkan.',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const updatePromo = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, label, description, price_normal, price_discounted, image_url, is_active } = req.body;

    const result = await query(
      `UPDATE promos
       SET title = COALESCE($1, title),
           label = COALESCE($2, label),
           description = COALESCE($3, description),
           price_normal = COALESCE($4, price_normal),
           price_discounted = COALESCE($5, price_discounted),
           image_url = COALESCE($6, image_url),
           is_active = COALESCE($7, is_active)
       WHERE id = $8
       RETURNING *`,
      [title, label, description, price_normal, price_discounted, image_url, is_active, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Promo dengan ID ${id} tidak ditemukan.`
      });
    }

    res.json({
      success: true,
      message: 'Promo berhasil diperbarui.',
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const deletePromo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await query('DELETE FROM promos WHERE id = $1 RETURNING id, title', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Promo dengan ID ${id} tidak ditemukan.`
      });
    }

    res.json({
      success: true,
      message: `Promo '${result.rows[0].title}' berhasil dihapus.`
    });
  } catch (error) {
    next(error);
  }
};
