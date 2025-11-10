import express from 'express';
import { publishPumpControl, getLastPumpState } from '../mqtt.js';
import { validatePumpAction } from '../utils/validator.js';
import logger from '../utils/logger.js';

const router = express.Router();

/**
 * POST /api/control/pump
 * Body: { "action": "ON" | "OFF" }
 * Publishes pump control command to MQTT topic iot/uas/pompa
 */
router.post('/pump', async (req, res, next) => {
  try {
    const { action } = req.body;
    
    if (!action) {
      return res.status(400).json({ 
        error: 'Missing action parameter. Expected: { "action": "ON" | "OFF" }' 
      });
    }
    
    if (!validatePumpAction(action)) {
      return res.status(400).json({ 
        error: 'Invalid action. Must be "ON" or "OFF"' 
      });
    }
    
    logger.info(`🎮 Request: POST /api/control/pump - Action: ${action}`);
    
    // Publish to MQTT
    await publishPumpControl(action);
    
    // Note: State will be updated automatically via MQTT subscription
    // in mqtt.js when the message is published
    
    res.json({
      success: true,
      action,
      message: `Pump turned ${action}`,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    next(error);
  }
});

/**
 * GET /api/control/pump/status
 * Returns current pump state from MQTT topic
 */
router.get('/pump/status', (req, res) => {
  const currentState = getLastPumpState();
  logger.info(`🔍 Request: GET /api/control/pump/status - Current state: ${currentState}`);
  res.json({
    status: currentState,
    timestamp: new Date().toISOString()
  });
});

export default router;
