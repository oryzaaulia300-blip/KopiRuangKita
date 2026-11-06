import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from './routes/authRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import promoRoutes from './routes/promoRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import { notFoundHandler, errorHandler } from './middleware/errorHandler.js';
import { pool } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

// 1. SECURITY & LOGGING
app.use(helmet({
  crossOriginResourcePolicy: false // Allows loading images/resources across origins
}));
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// 2. CORS CONFIGURATION
const allowedOrigins = process.env.CLIENT_ORIGIN
  ? process.env.CLIENT_ORIGIN.split(',').map((origin) => origin.trim())
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, Postman, server-to-server)
      if (!origin) return callback(null, true);

      // In development or if wildcard is specified, allow all origins
      if (process.env.NODE_ENV !== 'production' || allowedOrigins.includes('*')) {
        return callback(null, true);
      }

      const isAllowed = allowedOrigins.some((allowed) => {
        if (allowed === origin) return true;
        // Allow Vercel deployments (*.vercel.app)
        if (allowed.includes('.vercel.app') && origin.endsWith('.vercel.app')) return true;
        return false;
      });

      if (isAllowed) {
        return callback(null, true);
      }

      return callback(new Error(`CORS policy does not allow access from origin: ${origin}`));
    },
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    credentials: true,
  })
);

// 3. BODY PARSERS
// Limit is set to 15mb to smoothly handle payment proof images encoded as Base64 data URIs
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// 4. HEALTH CHECK & ROOT
const healthHandler = async (req, res) => {
  let dbStatus = 'DISCONNECTED';
  let dbTime = null;

  try {
    const dbRes = await pool.query('SELECT NOW() as current_time');
    dbStatus = 'CONNECTED';
    dbTime = dbRes.rows[0].current_time;
  } catch (error) {
    dbStatus = `ERROR: ${error.message}`;
  }

  res.json({
    status: 'OK',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'production',
    database: {
      status: dbStatus,
      serverTime: dbTime
    }
  });
};

app.get('/', (req, res) => {
  res.json({
    project: 'Kopi Ruang Kita API',
    version: '1.0.0',
    status: 'ONLINE',
    author: 'Orang 1: Database Architect & Full DevOps Lead',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth',
      menus: '/api/menus',
      orders: '/api/orders',
      promos: '/api/promos',
      contacts: '/api/contacts'
    }
  });
});

app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

// 5. API ROUTES (Mounted on both /api/* and /* for full compatibility with standalone server & Vercel Serverless)
app.use('/api/auth', authRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/promos', promoRoutes);
app.use('/api/contacts', contactRoutes);

app.use('/auth', authRoutes);
app.use('/menus', menuRoutes);
app.use('/orders', orderRoutes);
app.use('/promos', promoRoutes);
app.use('/contacts', contactRoutes);

// 6. ERROR HANDLERS
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
