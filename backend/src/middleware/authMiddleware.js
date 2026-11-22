import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.warn(
      `[SECURITY WARNING] Percobaan akses tanpa token sah pada ${req.method} ${req.originalUrl} (IP: ${req.ip})`
    );
    return res.status(401).json({
      success: false,
      message: 'Akses ditolak. Token autentikasi tidak ditemukan.'
    });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_jwt_key_default');
    req.user = decoded;
    next();
  } catch (error) {
    console.warn(
      `[SECURITY WARNING] Token JWT tidak valid atau kedaluwarsa pada ${req.method} ${req.originalUrl} - Alasan: ${error.message}`
    );
    return res.status(401).json({
      success: false,
      message: 'Token tidak valid atau telah kedaluwarsa.',
      error: error.message
    });
  }
};

export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      console.warn(
        `[SECURITY WARNING] Percobaan akses endpoint terproteksi tanpa sesi pengguna pada ${req.method} ${req.originalUrl}`
      );
      return res.status(401).json({
        success: false,
        message: 'Akses tidak sah. Silakan login terlebih dahulu.'
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      console.warn(
        `[SECURITY WARNING] Pelanggaran hak akses oleh user '${req.user.username}' (role: ${req.user.role}) pada ${req.method} ${req.originalUrl}`
      );
      return res.status(403).json({
        success: false,
        message: `Akses ditolak. Peran '${req.user.role}' tidak memiliki izin untuk tindakan ini.`
      });
    }

    next();
  };
};