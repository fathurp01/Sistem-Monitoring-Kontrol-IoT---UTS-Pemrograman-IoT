import dotenv from 'dotenv';
import app from './src/app.js';
import { initDatabase } from './src/db.js';
import { initMQTT } from './src/mqtt.js';
import logger from './src/utils/logger.js';

// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

/**
 * Start server and initialize connections
 */
async function startServer() {
  try {
    logger.info('🚀 Starting UTS IoT Backend Server...');
    
    // Initialize database
    await initDatabase();
    
    // Initialize MQTT
    initMQTT();
    
    // Start HTTP server
    app.listen(PORT, () => {
      logger.info(`✅ Server running on http://localhost:${PORT}`);
      logger.info(`📊 API Endpoints:`);
      logger.info(`   - GET  http://localhost:${PORT}/api/report/json`);
      logger.info(`   - GET  http://localhost:${PORT}/api/data/recent?limit=50`);
      logger.info(`   - GET  http://localhost:${PORT}/api/data/:id`);
      logger.info(`   - POST http://localhost:${PORT}/api/control/pump`);
      logger.info(`   - GET  http://localhost:${PORT}/api/control/pump/status`);
      logger.info(`   - GET  http://localhost:${PORT}/health`);
    });
    
  } catch (error) {
    logger.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
}

startServer();
