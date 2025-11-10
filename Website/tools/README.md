# 🛠️ IoT Testing Tools

Tools untuk testing dan verifikasi sistem IoT UTS Pemrograman IoT.

## 📦 Installation

```bash
cd tools
npm install
```

## 🧪 Tools Available

### 1. verify_setup.js - System Verification

Verifikasi semua endpoint backend berfungsi dengan baik.

**Cara menggunakan:**
```bash
npm run verify
# atau
node verify_setup.js
```

**Yang di-test:**
- ✅ Backend Health Check
- ✅ Analytics Report Endpoint (`/api/report/json`)
- ✅ Recent Data Endpoint (`/api/data/recent`)
- ✅ Pump Status Endpoint (`/api/control/pump/status`)

**Output sukses:**
```
🔍 UTS IoT System Verification
================================

Test 1: Backend Health Check...
✅ Backend is running
Test 2: Analytics Report Endpoint...
✅ Analytics report structure valid
   - Max Temp: 36°C
   - Min Temp: -1°C
   - Avg Temp: 25.88°C
   - Records: 10
Test 3: Recent Data Endpoint...
✅ Retrieved 10 records
Test 4: Pump Status Endpoint...
✅ Pump status: OFF

🎉 All tests passed! System is ready.
```

---

### 2. publish_test.js - MQTT Test Publisher

Simulasi ESP32 mengirim data sensor ke MQTT broker.

**Cara menggunakan:**
```bash
npm run publish-test
# atau
node publish_test.js
```

**Yang dilakukan:**
- Kirim 3 data sensor test ke topic `iot/uas/sensor`
- Delay 2 detik antar message
- Data format: `{"suhu": 32.5, "humidity": 65.3, "lux": 450}`

**Output sukses:**
```
🧪 MQTT Test Publisher
======================
MQTT Broker: mqtt://localhost:1883
Topic: iot/uas/sensor

✅ Connected to MQTT broker
✅ Published message 1/3:
{"suhu":32.5,"humidity":65.3,"lux":450}
...
✅ Test completed successfully!
```

**Verifikasi:**
1. Cek backend logs untuk melihat data insertion
2. Buka `http://localhost:3000/api/report/json` untuk lihat analytics
3. Refresh dashboard `http://localhost:5173` untuk lihat data baru

---

## 📋 Quick Start Guide

**1. Install dependencies:**
```bash
npm install
```

**2. Pastikan backend running:**
```bash
cd ../backend
npm start
```

**3. Jalankan verification:**
```bash
npm run verify
```

**4. Test MQTT publish:**
```bash
npm run publish-test
```

**5. Buka dashboard:**
```
http://localhost:5173
```

---

## 🔧 Configuration

Tools menggunakan environment variables dari file `.env` di parent directory:

- `MQTT_URL` - MQTT broker URL (default: `mqtt://localhost`)
- `MQTT_PORT` - MQTT broker port (default: `1883`)
- `MQTT_TOPIC_SENSOR` - Topic untuk sensor data (default: `iot/uas/sensor`)
- `PORT` - Backend server port (default: `3000`)

---

## 📝 Notes

- Tools ini menggunakan dependencies yang sama dengan backend (axios, mqtt, dotenv)
- Kedua tools bersifat **standalone** dan tidak mempengaruhi backend
- Ideal untuk testing tanpa perlu Wokwi ESP32 simulator
- Berguna untuk debugging dan demo

---

## 🚀 Use Cases

| Skenario | Tool yang Dipakai |
|----------|-------------------|
| Cek apakah backend running | `verify_setup.js` |
| Test endpoint API | `verify_setup.js` |
| Simulasi ESP32 kirim data | `publish_test.js` |
| Debugging MQTT connection | `publish_test.js` |
| Demo tanpa hardware | `publish_test.js` |

---

**Created for UTS Pemrograman IoT 2025**
