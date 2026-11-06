import { query } from '../config/db.js';

export const createContact = async (req, res, next) => {
  try {
    const { nama, noHp, no_hp, pesan } = req.body;

    const finalNama = (nama || '').trim();
    const finalNoHp = (noHp || no_hp || '').trim();
    const finalPesan = (pesan || '').trim();

    if (!finalNama || !finalNoHp || !finalPesan) {
      return res.status(400).json({
        success: false,
        message: 'Nama, nomor HP, dan pesan wajib diisi!'
      });
    }

    const result = await query(
      `INSERT INTO contacts (nama, no_hp, pesan)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [finalNama, finalNoHp, finalPesan]
    );

    res.status(201).json({
      success: true,
      message: `Terima kasih ${finalNama}, pesan Anda telah berhasil dikirim!`,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const { status, limit = 50 } = req.query;

    let sql = 'SELECT * FROM contacts';
    const params = [];

    if (status) {
      params.push(status.toUpperCase());
      sql += ' WHERE status = $1';
    }

    sql += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1);
    params.push(parseInt(limit, 10) || 50);

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

export const updateContactStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['UNREAD', 'READ', 'ARCHIVED'];
    const upperStatus = (status || '').toUpperCase();

    if (!validStatuses.includes(upperStatus)) {
      return res.status(400).json({
        success: false,
        message: `Status tidak valid. Pilihan: ${validStatuses.join(', ')}`
      });
    }

    const result = await query(
      'UPDATE contacts SET status = $1 WHERE id = $2 RETURNING *',
      [upperStatus, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Pesan dengan ID ${id} tidak ditemukan.`
      });
    }

    res.json({
      success: true,
      message: `Status pesan berhasil diperbarui menjadi ${upperStatus}.`,
      data: result.rows[0]
    });
  } catch (error) {
    next(error);
  }
};
