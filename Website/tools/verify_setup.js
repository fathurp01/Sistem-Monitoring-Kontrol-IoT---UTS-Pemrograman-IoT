import axios from 'axios';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const API_BASE = `http://localhost:${process.env.PORT || 3000}/api`;

console.log('🔍 UTS IoT System Verification');
console.log('================================');
console.log('');

async function verify() {
  const results = {
    passed: 0,
    failed: 0,
    tests: []
  };

  // Test 1: Health Check
  console.log('Test 1: Backend Health Check...');
  try {
    const response = await axios.get(`http://localhost:${process.env.PORT || 3000}/health`);
    if (response.data.status === 'OK') {
      console.log('✅ Backend is running');
      results.passed++;
      results.tests.push({ name: 'Health Check', status: 'PASS' });
    }
  } catch (error) {
    console.log('❌ Backend not reachable:', error.message);
    results.failed++;
    results.tests.push({ name: 'Health Check', status: 'FAIL', error: error.message });
  }

  // Test 2: Analytics Report
  console.log('Test 2: Analytics Report Endpoint...');
  try {
    const response = await axios.get(`${API_BASE}/report/json`);
    const data = response.data;
    
    // Validate structure
    const requiredFields = ['suhumax', 'suhumin', 'suhurata', 'nilai_suhu_max_humid_max', 'month_year_max'];
    const hasAllFields = requiredFields.every(field => data.hasOwnProperty(field));
    
    if (hasAllFields) {
      console.log('✅ Analytics report structure valid');
      console.log(`   - Max Temp: ${data.suhumax}°C`);
      console.log(`   - Min Temp: ${data.suhumin}°C`);
      console.log(`   - Avg Temp: ${data.suhurata}°C`);
      console.log(`   - Records: ${data.nilai_suhu_max_humid_max.length}`);
      results.passed++;
      results.tests.push({ name: 'Analytics Report', status: 'PASS' });
    } else {
      console.log('❌ Missing required fields');
      results.failed++;
      results.tests.push({ name: 'Analytics Report', status: 'FAIL', error: 'Missing fields' });
    }
  } catch (error) {
    console.log('❌ Failed to fetch analytics:', error.message);
    results.failed++;
    results.tests.push({ name: 'Analytics Report', status: 'FAIL', error: error.message });
  }

  // Test 3: Recent Data
  console.log('Test 3: Recent Data Endpoint...');
  try {
    const response = await axios.get(`${API_BASE}/data/recent?limit=10`);
    if (response.data.data && Array.isArray(response.data.data)) {
      console.log(`✅ Retrieved ${response.data.count} records`);
      results.passed++;
      results.tests.push({ name: 'Recent Data', status: 'PASS' });
    }
  } catch (error) {
    console.log('❌ Failed to fetch recent data:', error.message);
    results.failed++;
    results.tests.push({ name: 'Recent Data', status: 'FAIL', error: error.message });
  }

  // Test 4: Pump Status
  console.log('Test 4: Pump Status Endpoint...');
  try {
    const response = await axios.get(`${API_BASE}/control/pump/status`);
    if (response.data.status) {
      console.log(`✅ Pump status: ${response.data.status}`);
      results.passed++;
      results.tests.push({ name: 'Pump Status', status: 'PASS' });
    }
  } catch (error) {
    console.log('❌ Failed to get pump status:', error.message);
    results.failed++;
    results.tests.push({ name: 'Pump Status', status: 'FAIL', error: error.message });
  }

  // Summary
  console.log('');
  console.log('================================');
  console.log('VERIFICATION SUMMARY');
  console.log('================================');
  console.log(`Total Tests: ${results.passed + results.failed}`);
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log('');

  if (results.failed === 0) {
    console.log('🎉 All tests passed! System is ready.');
  } else {
    console.log('⚠️ Some tests failed. Please check configuration.');
  }

  return results;
}

verify().catch(console.error);
