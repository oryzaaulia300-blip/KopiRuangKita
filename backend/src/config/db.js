import pg from 'pg';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../../.env') });

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL;

const resolveSslConfig = () => {
  if (!connectionString) return false;
  if (connectionString.includes('localhost') || connectionString.includes('127.0.0.1')) {
    return false;
  }
  // Railway private network internal hostname does not use SSL by default
  if (
    connectionString.includes('sslmode=disable') ||
    (connectionString.includes('.railway.internal') && !connectionString.includes('sslmode=require'))
  ) {
    return false;
  }
  // Cloud databases (Neon, Supabase, Render, Railway Public Proxy) require SSL
  return { rejectUnauthorized: false };
};

export const pool = new Pool({
  connectionString: connectionString || undefined,
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'kopiruangkita',
  ssl: resolveSslConfig(),
  max: 20, // Max clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (err) => {
  console.error('[DATABASE POOL ERROR] Unexpected client error:', err.message);
});

export const query = (text, params) => pool.query(text, params);

export const getClient = () => pool.connect();

export const testDbConnection = async () => {
  try {
    const res = await pool.query('SELECT NOW() as current_time, current_database() as db_name');
    console.log(`[DB SUCCESS] Connected to database '${res.rows[0].db_name}' at ${res.rows[0].current_time}`);
    return true;
  } catch (error) {
    console.error('[DB WARNING] Could not connect to database on startup:', error.message);
    console.warn('[DB WARNING] Please ensure DATABASE_URL is valid or database server is running.');
    return false;
  }
};

export default {
  pool,
  query,
  getClient,
  testDbConnection
};
