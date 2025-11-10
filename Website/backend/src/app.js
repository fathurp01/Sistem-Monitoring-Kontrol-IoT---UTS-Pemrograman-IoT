import express from 'express';
import cors from 'cors';
import { initDatabase, closeDatabase } from './db.js';
import { initMQTT, closeMQTT } from './mqtt.js';
import reportRoutes from './routes/report.js';
import dataRoutes from './routes/data.js';
import controlRoutes from './routes/control.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import logger from './utils/logger.js';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration - allow frontend origin
const allowedOrigins = [
  process.env.FRONTEND_URL || 'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5174' // Alternative Vite port
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      logger.warn(`⚠️ CORS blocked request from: ${origin}`);
      callback(null, true); // Allow anyway for development
    }
  },
  credentials: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API Routes
app.use('/api/report', reportRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/control', controlRoutes);

// 404 handler
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', async () => {
  logger.info('🛑 Shutting down gracefully...');
  closeMQTT();
  await closeDatabase();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  logger.info('🛑 Shutting down gracefully...');
  closeMQTT();
  await closeDatabase();
  process.exit(0);
});

export default app;
