import { query } from '../config/db.js';

export const getAllPromos = async (req, res) => {
  try {
    const { includeInactive } = req.query;

    let sql = 'SELECT * FROM promos';
    if (includeInactive !== 'true') {
      sql += ' WHERE is_active = true';
    }
    sql += ' ORDER BY id ASC';

    const result = await query(sql);
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error('[getAllPromos error]:', error);
    return res.status(500).json({ message: 'Gagal mengambil data promo' });
  }
};

export const createPromo = async (req, res) => {
  try {
    const {
      title,
      label = null,
      description = null,
      price_normal = null,
      price_discounted = null,
      image_url = null,
      is_active = true,
    } = req.body;

    if (!title || !String(title).trim()) {
      return res.status(400).json({ message: 'Judul promo wajib diisi' });
    }

    const result = await query(
      `INSERT INTO promos (title, label, description, price_normal, price_discounted, image_url, is_active)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [
        String(title).trim(),
        label,
        description,
        price_normal,
        price_discounted,
        image_url,
        Boolean(is_active),
      ]
    );

    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('[createPromo error]:', error);
    return res.status(500).json({ message: 'Gagal menambah promo baru' });
  }
};

export const updatePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const existingRes = await query('SELECT * FROM promos WHERE id = $1', [id]);

    if (existingRes.rows.length === 0) {
      return res.status(404).json({ message: 'Promo tidak ditemukan' });
    }

    const current = existingRes.rows[0];
    const title = req.body.title !== undefined ? String(req.body.title).trim() : current.title;
    const label = req.body.label !== undefined ? req.body.label : current.label;
    const description =
      req.body.description !== undefined ? req.body.description : current.description;
    const price_normal =
      req.body.price_normal !== undefined ? req.body.price_normal : current.price_normal;
    const price_discounted =
      req.body.price_discounted !== undefined
        ? req.body.price_discounted
        : current.price_discounted;
    const image_url = req.body.image_url !== undefined ? req.body.image_url : current.image_url;
    const is_active =
      req.body.is_active !== undefined ? Boolean(req.body.is_active) : current.is_active;

    if (!title) {
      return res.status(400).json({ message: 'Judul promo tidak boleh kosong' });
    }

    const result = await query(
      `UPDATE promos
       SET title = $1,
           label = $2,
           description = $3,
           price_normal = $4,
           price_discounted = $5,
           image_url = $6,
           is_active = $7,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $8
       RETURNING *`,
      [title, label, description, price_normal, price_discounted, image_url, is_active, id]
    );

    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('[updatePromo error]:', error);
    return res.status(500).json({ message: 'Gagal memperbarui promo' });
  }
};

export const deletePromo = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM promos WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Promo tidak ditemukan' });
    }

    return res.status(200).json({ message: 'Promo berhasil dihapus', deleted: result.rows[0] });
  } catch (error) {
    console.error('[deletePromo error]:', error);
    return res.status(500).json({ message: 'Gagal menghapus promo' });
  }
};