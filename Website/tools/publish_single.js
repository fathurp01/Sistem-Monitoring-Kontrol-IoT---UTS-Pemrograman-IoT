import mqtt from 'mqtt';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const MQTT_URL = process.env.MQTT_URL || 'mqtt://localhost';
const MQTT_PORT = process.env.MQTT_PORT || '1883';
const SENSOR_TOPIC = process.env.MQTT_TOPIC_SENSOR || 'iot/uas/sensor';

console.log('📤 Publishing Single Test Message to MQTT');
console.log('==========================================');
console.log(`MQTT Broker: ${MQTT_URL}:${MQTT_PORT}`);
console.log(`Topic: ${SENSOR_TOPIC}`);
console.log('');

// Generate random sensor data
const payload = {
  suhu: Math.floor(Math.random() * 20) + 20, // 20-40°C
  humidity: Math.floor(Math.random() * 40) + 40, // 40-80%
  lux: Math.floor(Math.random() * 800) + 200 // 200-1000 lux
};

const options = {
  port: parseInt(MQTT_PORT, 10),
  clientId: `test_single_${Math.random().toString(16).slice(3)}`,
};

if (process.env.MQTT_USER) {
  options.username = process.env.MQTT_USER;
  options.password = process.env.MQTT_PASS || '';
}

const client = mqtt.connect(MQTT_URL, options);

client.on('connect', () => {
  console.log('✅ Connected to MQTT broker');
  console.log('');
  console.log('📨 Publishing message:');
  console.log(JSON.stringify(payload, null, 2));
  console.log('');
  
  const message = JSON.stringify(payload);
  
  client.publish(SENSOR_TOPIC, message, { qos: 1 }, (error) => {
    if (error) {
      console.error('❌ Failed to publish:', error.message);
      process.exit(1);
    } else {
      console.log('✅ Message published successfully!');
      console.log('');
      console.log('💡 Next steps:');
      console.log('   1. Check backend logs for insertion confirmation');
      console.log('   2. Refresh dashboard at http://localhost:5173');
      console.log('   3. New data should appear in "Data Sensor Terbaru" table');
      console.log('');
      
      client.end();
      process.exit(0);
    }
  });
});

client.on('error', (error) => {
  console.error('❌ MQTT Error:', error.message);
  process.exit(1);
});
