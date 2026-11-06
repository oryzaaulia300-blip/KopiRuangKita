import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from backend root
dotenv.config({ path: path.join(__dirname, '../.env') });

const { Pool } = pg;

const isProduction = process.env.NODE_ENV === 'production';
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('\x1b[31m[ERROR] DATABASE_URL is not defined in .env\x1b[0m');
  console.error('Please set DATABASE_URL in backend/.env before running migrations.');
  process.exit(1);
}

// Support SSL for hosted PostgreSQL providers like Neon.tech, Supabase, Render
const pool = new Pool({
  connectionString,
  ssl: connectionString.includes('localhost') || connectionString.includes('127.0.0.1')
    ? false
    : { rejectUnauthorized: false }
});

async function runMigration() {
  const args = process.argv.slice(2);
  const isReset = args.includes('--reset');
  const isSeedOnly = args.includes('--seed-only');

  const client = await pool.connect();
  console.log('\x1b[36m====================================================\x1b[0m');
  console.log('\x1b[36m  KOPI RUANG KITA - DATABASE MIGRATION & SEEDING    \x1b[0m');
  console.log('\x1b[36m====================================================\x1b[0m');
  console.log(`Connecting to database...`);

  try {
    if (isReset) {
      console.log('\x1b[33m[RESET] Dropping existing schema tables...\x1b[0m');
      await client.query(`
        DROP TABLE IF EXISTS order_items CASCADE;
        DROP TABLE IF EXISTS orders CASCADE;
        DROP TABLE IF EXISTS menus CASCADE;
        DROP TABLE IF EXISTS promos CASCADE;
        DROP TABLE IF EXISTS contacts CASCADE;
        DROP TABLE IF EXISTS users CASCADE;
      `);
      console.log('\x1b[32m[OK] Existing tables dropped cleanly.\x1b[0m');
    }

    if (!isSeedOnly) {
      console.log('Reading and executing schema.sql...');
      const schemaPath = path.join(__dirname, 'schema.sql');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await client.query(schemaSql);
      console.log('\x1b[32m[OK] Schema tables, triggers, and indexes created successfully!\x1b[0m');
    }

    console.log('Reading and executing seed.sql...');
    const seedPath = path.join(__dirname, 'seed.sql');
    const seedSql = fs.readFileSync(seedPath, 'utf8');
    await client.query(seedSql);
    console.log('\x1b[32m[OK] Seed data inserted successfully!\x1b[0m');

    // Summary verification
    const usersCount = await client.query('SELECT COUNT(*) FROM users');
    const menusCount = await client.query('SELECT COUNT(*) FROM menus');
    const promosCount = await client.query('SELECT COUNT(*) FROM promos');
    const contactsCount = await client.query('SELECT COUNT(*) FROM contacts');

    console.log('\x1b[36m----------------------------------------------------\x1b[0m');
    console.log('\x1b[32m✓ Database Setup Complete!\x1b[0m');
    console.log(`  - Users    : ${usersCount.rows[0].count} record(s)`);
    console.log(`  - Menus    : ${menusCount.rows[0].count} record(s)`);
    console.log(`  - Promos   : ${promosCount.rows[0].count} record(s)`);
    console.log(`  - Contacts : ${contactsCount.rows[0].count} record(s)`);
    console.log('\x1b[36m====================================================\x1b[0m');
  } catch (err) {
    console.error('\x1b[31m[ERROR] Migration failed:\x1b[0m', err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

runMigration();
