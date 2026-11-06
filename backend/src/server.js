import app from './app.js';
import { testDbConnection, pool } from './config/db.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, async () => {
  console.log('====================================================');
  console.log(`☕ KOPI RUANG KITA - SERVER STARTED`);
  console.log(`📡 URL: http://localhost:${PORT}`);
  console.log(`🚀 Mode: ${process.env.NODE_ENV || 'development'}`);
  console.log('====================================================');

  // Test database connection on startup
  await testDbConnection();
});

// Graceful shutdown handling
const handleGracefulShutdown = (signal) => {
  console.log(`\n[${signal}] Shutting down server gracefully...`);
  server.close(async () => {
    console.log('[HTTP] Server closed.');
    try {
      await pool.end();
      console.log('[DATABASE] PostgreSQL pool connection closed.');
    } catch (err) {
      console.error('[DATABASE] Error while closing pool:', err.message);
    }
    process.exit(0);
  });

  // Force close after 10s if hanging
  setTimeout(() => {
    console.error('[FORCE SHUTDOWN] Server could not close in time, forcing exit.');
    process.exit(1);
  }, 10000);
};

process.on('SIGINT', () => handleGracefulShutdown('SIGINT'));
process.on('SIGTERM', () => handleGracefulShutdown('SIGTERM'));
