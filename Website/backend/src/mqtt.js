import mqtt from 'mqtt';
import logger from './utils/logger.js';
import { validateSensorPayload } from './utils/validator.js';
import { insertSensorData } from './db.js';

let mqttClient = null;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;
const RECONNECT_DELAY = 5000; // 5 seconds

// Store last pump state from MQTT
let lastPumpState = 'OFF';

// Debounce configuration to prevent too-frequent inserts
let lastInsertTime = 0;
const MIN_INSERT_INTERVAL = parseInt(process.env.MIN_INSERT_INTERVAL || '1000', 10); // 1 second default

/**
 * Initialize MQTT client and subscribe to sensor topic
 */
export function initMQTT() {
  const mqttUrl = process.env.MQTT_URL || 'mqtt://localhost';
  const mqttPort = process.env.MQTT_PORT || '1883';
  const sensorTopic = process.env.MQTT_TOPIC_SENSOR || 'iot/uas/sensor';
  
  const options = {
    port: parseInt(mqttPort, 10),
    clientId: `iot_backend_${Math.random().toString(16).slice(3)}`,
    clean: true,
    reconnectPeriod: RECONNECT_DELAY,
    connectTimeout: 30 * 1000,
  };

  // Add credentials if provided
  if (process.env.MQTT_USER) {
    options.username = process.env.MQTT_USER;
    options.password = process.env.MQTT_PASS || '';
  }

  logger.info(`🔌 Connecting to MQTT broker at ${mqttUrl}:${mqttPort}...`);
  mqttClient = mqtt.connect(mqttUrl, options);

  mqttClient.on('connect', () => {
    logger.info('✅ MQTT connected successfully');
    reconnectAttempts = 0;
    
    const sensorTopic = process.env.MQTT_TOPIC_SENSOR || 'iot/uas/sensor';
    const pumpTopic = process.env.MQTT_TOPIC_PUMP || 'iot/uas/pompa';
    
    // Subscribe to sensor topic
    mqttClient.subscribe(sensorTopic, (err) => {
      if (err) {
        logger.error(`❌ Failed to subscribe to ${sensorTopic}: ${err.message}`);
      } else {
        logger.info(`📡 Subscribed to topic: ${sensorTopic}`);
      }
    });
    
    // Subscribe to pump topic to track state
    mqttClient.subscribe(pumpTopic, (err) => {
      if (err) {
        logger.error(`❌ Failed to subscribe to ${pumpTopic}: ${err.message}`);
      } else {
        logger.info(`📡 Subscribed to topic: ${pumpTopic}`);
      }
    });
  });

  mqttClient.on('message', async (topic, message) => {
    try {
      const sensorTopic = process.env.MQTT_TOPIC_SENSOR || 'iot/uas/sensor';
      const pumpTopic = process.env.MQTT_TOPIC_PUMP || 'iot/uas/pompa';
      
      // Handle pump topic messages
      if (topic === pumpTopic) {
        const pumpState = message.toString().trim().toUpperCase();
        if (pumpState === 'ON' || pumpState === 'OFF') {
          lastPumpState = pumpState;
          logger.info(`🔌 Pump state updated from MQTT: ${pumpState}`);
        }
        return;
      }
      
      // Handle sensor topic messages
      if (topic !== sensorTopic) {
        return;
      }

      // Debounce check
      const now = Date.now();
      if (now - lastInsertTime < MIN_INSERT_INTERVAL) {
        logger.warn(`⏱️ Message received too soon, debouncing (${now - lastInsertTime}ms)`);
        return;
      }

      const payload = message.toString();
      logger.info(`📨 Received message on ${topic}: ${payload}`);

      // Parse JSON
      let data;
      try {
        data = JSON.parse(payload);
      } catch (parseError) {
        logger.error(`❌ Invalid JSON: ${parseError.message}`);
        return;
      }

      // Validate payload
      const validation = validateSensorPayload(data);
      if (!validation.valid) {
        logger.error(`❌ Validation failed: ${validation.errors.join(', ')}`);
        return;
      }

      // Insert into database
      await insertSensorData(validation.data);
      lastInsertTime = Date.now();

    } catch (error) {
      logger.error(`❌ Error processing MQTT message: ${error.message}`);
    }
  });

  mqttClient.on('error', (error) => {
    logger.error(`❌ MQTT error: ${error.message}`);
  });

  mqttClient.on('reconnect', () => {
    reconnectAttempts++;
    if (reconnectAttempts <= MAX_RECONNECT_ATTEMPTS) {
      logger.info(`🔄 Reconnecting to MQTT broker (attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS})...`);
    } else {
      logger.error('❌ Max reconnect attempts reached. Please check MQTT broker.');
      mqttClient.end();
    }
  });

  mqttClient.on('close', () => {
    logger.warn('⚠️ MQTT connection closed');
  });

  return mqttClient;
}

/**
 * Publish message to pump control topic
 * @param {string} action - "ON" or "OFF"
 */
export function publishPumpControl(action) {
  const pumpTopic = process.env.MQTT_TOPIC_PUMP || 'iot/uas/pompa';
  
  if (!mqttClient || !mqttClient.connected) {
    throw new Error('MQTT client not connected');
  }

  return new Promise((resolve, reject) => {
    mqttClient.publish(pumpTopic, action, { qos: 1 }, (error) => {
      if (error) {
        logger.error(`❌ Failed to publish to ${pumpTopic}: ${error.message}`);
        reject(error);
      } else {
        logger.info(`📤 Published "${action}" to ${pumpTopic}`);
        resolve();
      }
    });
  });
}

/**
 * Get MQTT client instance
 */
export function getMQTTClient() {
  return mqttClient;
}

/**
 * Get last pump state from MQTT
 */
export function getLastPumpState() {
  return lastPumpState;
}

/**
 * Close MQTT connection
 */
export function closeMQTT() {
  if (mqttClient) {
    mqttClient.end();
    logger.info('🔌 MQTT connection closed');
  }
}
