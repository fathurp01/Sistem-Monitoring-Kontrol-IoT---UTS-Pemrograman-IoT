/**
 * Validates incoming MQTT sensor payload
 * Supports both UTS format (suhu/humidity/lux) and Wokwi ESP32 format (temperature/humidity/light)
 * @param {Object} payload - Parsed JSON payload
 * @returns {Object} { valid: boolean, errors: string[], data: Object }
 */
export function validateSensorPayload(payload) {
  const errors = [];
  const data = {};

  // Validate suhu/temperature - must be numeric
  // Support both "suhu" (UTS format) and "temperature" (Wokwi ESP32 format)
  const tempValue = payload.suhu !== undefined ? payload.suhu : payload.temperature;
  
  if (tempValue === undefined || tempValue === null) {
    errors.push('suhu/temperature is required');
  } else {
    const suhu = parseFloat(tempValue);
    if (isNaN(suhu)) {
      errors.push('suhu/temperature must be a number');
    } else {
      data.suhu = suhu;
    }
  }

  // Validate humidity - must be numeric (same field name in both formats)
  if (payload.humidity === undefined || payload.humidity === null) {
    errors.push('humidity is required');
  } else {
    const humidity = parseFloat(payload.humidity);
    if (isNaN(humidity)) {
      errors.push('humidity must be a number');
    } else {
      data.humidity = humidity;
    }
  }

  // Validate lux/light - must be integer
  // Support both "lux" (UTS format) and "light" (Wokwi ESP32 format)
  const lightValue = payload.lux !== undefined ? payload.lux : payload.light;
  
  if (lightValue === undefined || lightValue === null) {
    errors.push('lux/light is required');
  } else {
    const lux = parseInt(lightValue, 10);
    if (isNaN(lux)) {
      errors.push('lux/light must be an integer');
    } else {
      data.lux = lux;
    }
  }

  // Timestamp is optional - use server time if not provided
  if (payload.timestamp) {
    data.timestamp = payload.timestamp;
  } else {
    // Server will use NOW() in SQL
    data.timestamp = null;
  }

  return {
    valid: errors.length === 0,
    errors,
    data
  };
}

/**
 * Validates pump control action
 * @param {string} action - "ON" or "OFF"
 * @returns {boolean}
 */
export function validatePumpAction(action) {
  return action === 'ON' || action === 'OFF';
}
