import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query } from '../config/db.js';

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Username dan password wajib diisi.'
      });
    }

    const userResult = await query(
      'SELECT id, username, password, full_name, role FROM users WHERE username = $1',
      [username.trim()]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah.'
      });
    }

    const user = userResult.rows[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Username atau password salah.'
      });
    }

    const tokenPayload = {
      id: user.id,
      username: user.username,
      full_name: user.full_name,
      role: user.role
    };

    const token = jwt.sign(
      tokenPayload,
      process.env.JWT_SECRET || 'super_secret_jwt_key_default',
      { expiresIn: process.env.JWT_EXPIRES_IN || '24h' }
    );

    res.json({
      success: true,
      message: `Login berhasil! Selamat datang, ${user.full_name}.`,
      token,
      user: {
        id: user.id,
        username: user.username,
        full_name: user.full_name,
        role: user.role
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    const userResult = await query(
      'SELECT id, username, full_name, role, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Pengguna tidak ditemukan.'
      });
    }

    res.json({
      success: true,
      user: userResult.rows[0]
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { username, password, full_name, role = 'staff' } = req.body;

    if (!username || !password || !full_name) {
      return res.status(400).json({
        success: false,
        message: 'Username, password, dan nama lengkap wajib diisi.'
      });
    }

    const validRoles = ['owner', 'admin', 'staff'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: `Role tidak valid. Pilihan role: ${validRoles.join(', ')}`
      });
    }

    const existingUser = await query('SELECT id FROM users WHERE username = $1', [username.trim()]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({
        success: false,
        message: `Username '${username}' sudah terdaftar.`
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await query(
      `INSERT INTO users (username, password, full_name, role)
       VALUES ($1, $2, $3, $4)
       RETURNING id, username, full_name, role, created_at`,
      [username.trim(), hashedPassword, full_name.trim(), role]
    );

    res.status(201).json({
      success: true,
      message: 'User baru berhasil didaftarkan.',
      user: newUser.rows[0]
    });
  } catch (error) {
    next(error);
  }
};
