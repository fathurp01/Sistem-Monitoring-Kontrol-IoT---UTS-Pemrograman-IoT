import axios from 'axios';
import mqtt from 'mqtt';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const API_BASE = `http://localhost:${process.env.PORT || 3000}/api`;
const MQTT_URL = process.env.MQTT_URL || 'mqtt://localhost';
const MQTT_PORT = process.env.MQTT_PORT || '1883';
const PUMP_TOPIC = process.env.MQTT_TOPIC_PUMP || 'iot/uas/pompa';

console.log('🧪 COMPREHENSIVE DASHBOARD FEATURE TEST');
console.log('=========================================');
console.log('');

let testResults = {
  passed: 0,
  failed: 0,
  total: 0
};

function logTest(name, passed, details = '') {
  testResults.total++;
  if (passed) {
    testResults.passed++;
    console.log(`✅ ${name}`);
    if (details) console.log(`   ${details}`);
  } else {
    testResults.failed++;
    console.log(`❌ ${name}`);
    if (details) console.log(`   ${details}`);
  }
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function testDashboard() {
  console.log('📊 TESTING DASHBOARD COMPONENTS');
  console.log('================================\n');

  // Test 1: Stats Cards (suhumax, suhumin, suhurata)
  console.log('[1] Testing Stats Cards...');
  try {
    const response = await axios.get(`${API_BASE}/report/json`);
    const data = response.data;
    
    const hasMax = typeof data.suhumax === 'number';
    const hasMin = typeof data.suhumin === 'number';
    const hasAvg = typeof data.suhurata === 'number';
    
    logTest('Stats - Suhu Maksimum', hasMax, `Value: ${data.suhumax}°C`);
    logTest('Stats - Suhu Minimum', hasMin, `Value: ${data.suhumin}°C`);
    logTest('Stats - Suhu Rata-rata', hasAvg, `Value: ${data.suhurata}°C`);
  } catch (error) {
    logTest('Stats Cards', false, error.message);
  }
  
  console.log('');

  // Test 2: Recent Data Table
  console.log('[2] Testing Recent Data Table...');
  try {
    const response = await axios.get(`${API_BASE}/data/recent?limit=10`);
    const data = response.data.data;
    
    const isArray = Array.isArray(data);
    const hasRecords = data.length > 0;
    const hasValidFields = hasRecords && data[0].hasOwnProperty('suhu') && 
                          data[0].hasOwnProperty('humidity') && 
                          data[0].hasOwnProperty('lux');
    
    logTest('Recent Data - Returns Array', isArray);
    logTest('Recent Data - Has Records', hasRecords, `Count: ${data.length}`);
    logTest('Recent Data - Valid Fields', hasValidFields, 'suhu, humidity, lux present');
  } catch (error) {
    logTest('Recent Data Table', false, error.message);
  }
  
  console.log('');

  // Test 3: Suhu Max Table (nilai_suhu_max_humid_max)
  console.log('[3] Testing Suhu Max Table...');
  try {
    const response = await axios.get(`${API_BASE}/report/json`);
    const data = response.data.nilai_suhu_max_humid_max;
    
    const isArray = Array.isArray(data);
    const hasRecords = data && data.length > 0;
    const hasValidFields = hasRecords && data[0].hasOwnProperty('suhu') && 
                          data[0].hasOwnProperty('humid') && 
                          data[0].hasOwnProperty('kecerahan');
    
    logTest('Suhu Max - Returns Array', isArray);
    logTest('Suhu Max - Has Records', hasRecords, `Count: ${data?.length || 0}`);
    logTest('Suhu Max - Valid Fields', hasValidFields, 'suhu, humid, kecerahan present');
  } catch (error) {
    logTest('Suhu Max Table', false, error.message);
  }
  
  console.log('');

  // Test 4: Month-Year Badges
  console.log('[4] Testing Month-Year Badges...');
  try {
    const response = await axios.get(`${API_BASE}/report/json`);
    const data = response.data.month_year_max;
    
    const isArray = Array.isArray(data);
    const hasRecords = data && data.length > 0;
    const hasMonthYear = hasRecords && data[0].hasOwnProperty('month_year');
    
    logTest('Month-Year - Returns Array', isArray);
    logTest('Month-Year - Has Records', hasRecords, `Count: ${data?.length || 0}`);
    logTest('Month-Year - Valid Format', hasMonthYear, hasRecords ? data[0].month_year : '');
  } catch (error) {
    logTest('Month-Year Badges', false, error.message);
  }
  
  console.log('');

  // Test 5: Pump Control - Read Status
  console.log('[5] Testing Pump Control - Read Status...');
  try {
    const response = await axios.get(`${API_BASE}/control/pump/status`);
    const status = response.data.status;
    
    const hasStatus = status !== undefined;
    const validStatus = status === 'ON' || status === 'OFF';
    
    logTest('Pump - Status Endpoint', hasStatus, `Current: ${status}`);
    logTest('Pump - Valid Status Value', validStatus, 'Must be ON or OFF');
  } catch (error) {
    logTest('Pump Status', false, error.message);
  }
  
  console.log('');

  // Test 6: Pump Control - Turn ON
  console.log('[6] Testing Pump Control - Turn ON...');
  try {
    const response = await axios.post(`${API_BASE}/control/pump`, { action: 'ON' });
    const success = response.data.success;
    
    logTest('Pump - Turn ON API', success, 'Command sent');
    
    // Wait for MQTT to propagate
    await delay(1000);
    
    // Check status
    const statusRes = await axios.get(`${API_BASE}/control/pump/status`);
    const statusIsOn = statusRes.data.status === 'ON';
    
    logTest('Pump - Status Updates to ON', statusIsOn, `Status: ${statusRes.data.status}`);
  } catch (error) {
    logTest('Pump Turn ON', false, error.message);
  }
  
  console.log('');

  // Test 7: Pump Control - Turn OFF
  console.log('[7] Testing Pump Control - Turn OFF...');
  try {
    const response = await axios.post(`${API_BASE}/control/pump`, { action: 'OFF' });
    const success = response.data.success;
    
    logTest('Pump - Turn OFF API', success, 'Command sent');
    
    // Wait for MQTT to propagate
    await delay(1000);
    
    // Check status
    const statusRes = await axios.get(`${API_BASE}/control/pump/status`);
    const statusIsOff = statusRes.data.status === 'OFF';
    
    logTest('Pump - Status Updates to OFF', statusIsOff, `Status: ${statusRes.data.status}`);
  } catch (error) {
    logTest('Pump Turn OFF', false, error.message);
  }
  
  console.log('');

  // Test 8: MQTT Last State Persistence
  console.log('[8] Testing MQTT Last State (Subscribe to topic)...');
  
  const mqttPromise = new Promise((resolve, reject) => {
    const options = {
      port: parseInt(MQTT_PORT, 10),
      clientId: `test_client_${Math.random().toString(16).slice(3)}`,
    };

    if (process.env.MQTT_USER) {
      options.username = process.env.MQTT_USER;
      options.password = process.env.MQTT_PASS || '';
    }

    const client = mqtt.connect(MQTT_URL, options);
    let messageReceived = false;

    client.on('connect', () => {
      client.subscribe(PUMP_TOPIC, (err) => {
        if (err) {
          reject(err);
          return;
        }

        // Publish test message
        client.publish(PUMP_TOPIC, 'ON', { qos: 1 }, (err) => {
          if (err) reject(err);
        });
      });
    });

    client.on('message', (topic, message) => {
      if (topic === PUMP_TOPIC) {
        messageReceived = true;
        const msg = message.toString();
        
        setTimeout(() => {
          client.end();
          resolve({ success: true, message: msg });
        }, 500);
      }
    });

    client.on('error', (error) => {
      reject(error);
    });

    // Timeout after 5 seconds
    setTimeout(() => {
      if (!messageReceived) {
        client.end();
        reject(new Error('Timeout waiting for MQTT message'));
      }
    }, 5000);
  });

  try {
    const result = await mqttPromise;
    logTest('MQTT - Subscribe to Pump Topic', true, `Received: ${result.message}`);
    
    // Verify backend received the message
    await delay(1000);
    const statusRes = await axios.get(`${API_BASE}/control/pump/status`);
    const backendUpdated = statusRes.data.status === 'ON';
    
    logTest('MQTT - Backend Reads Last State', backendUpdated, `Backend state: ${statusRes.data.status}`);
  } catch (error) {
    logTest('MQTT Last State', false, error.message);
  }

  console.log('');
  console.log('=========================================');
  console.log('📋 TEST SUMMARY');
  console.log('=========================================');
  console.log(`Total Tests: ${testResults.total}`);
  console.log(`✅ Passed: ${testResults.passed}`);
  console.log(`❌ Failed: ${testResults.failed}`);
  console.log(`Success Rate: ${((testResults.passed / testResults.total) * 100).toFixed(1)}%`);
  console.log('');

  if (testResults.failed === 0) {
    console.log('🎉 ALL DASHBOARD FEATURES WORKING PERFECTLY!');
  } else {
    console.log('⚠️  Some features need attention. Check failed tests above.');
  }
  
  process.exit(testResults.failed > 0 ? 1 : 0);
}

testDashboard().catch(error => {
  console.error('❌ Test suite failed:', error);
  process.exit(1);
});
