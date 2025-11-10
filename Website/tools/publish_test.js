import mqtt from 'mqtt';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from parent directory
dotenv.config({ path: join(__dirname, '..', '.env') });

const MQTT_URL = process.env.MQTT_URL || 'mqtt://localhost';
const MQTT_PORT = process.env.MQTT_PORT || '1883';
const SENSOR_TOPIC = process.env.MQTT_TOPIC_SENSOR || 'iot/uas/sensor';

console.log('🧪 MQTT Test Publisher');
console.log('======================');
console.log(`MQTT Broker: ${MQTT_URL}:${MQTT_PORT}`);
console.log(`Topic: ${SENSOR_TOPIC}`);
console.log('');

// Sample sensor payloads
const testPayloads = [
  {
    suhu: 32.5,
    humidity: 65.3,
    lux: 450,
    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
  },
  {
    suhu: 28.7,
    humidity: 72.1,
    lux: 320
    // timestamp omitted - server will use NOW()
  },
  {
    suhu: 36.0,
    humidity: 55.8,
    lux: 580,
    timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
  }
];

const options = {
  port: parseInt(MQTT_PORT, 10),
  clientId: `test_publisher_${Math.random().toString(16).slice(3)}`,
};

if (process.env.MQTT_USER) {
  options.username = process.env.MQTT_USER;
  options.password = process.env.MQTT_PASS || '';
}

const client = mqtt.connect(MQTT_URL, options);

client.on('connect', () => {
  console.log('✅ Connected to MQTT broker');
  console.log('');
  
  // Publish test messages with delay
  testPayloads.forEach((payload, index) => {
    setTimeout(() => {
      const message = JSON.stringify(payload);
      
      client.publish(SENSOR_TOPIC, message, { qos: 1 }, (error) => {
        if (error) {
          console.error(`❌ Failed to publish message ${index + 1}:`, error.message);
        } else {
          console.log(`✅ Published message ${index + 1}/${testPayloads.length}:`);
          console.log(message);
          console.log('');
        }
        
        // Disconnect after last message
        if (index === testPayloads.length - 1) {
          setTimeout(() => {
            console.log('🔌 Disconnecting...');
            client.end();
            console.log('✅ Test completed successfully!');
            console.log('');
            console.log('💡 Check your backend logs to verify data insertion.');
            console.log('💡 Then visit http://localhost:3000/api/report/json to see the analytics.');
          }, 1000);
        }
      });
    }, index * 2000); // 2 second delay between messages
  });
});

client.on('error', (error) => {
  console.error('❌ MQTT Error:', error.message);
  process.exit(1);
});
