# UTS IoT Monitoring System 🌡️💧

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green)](https://nodejs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-blue)](https://www.mysql.com/)
[![MQTT](https://img.shields.io/badge/MQTT-Mosquitto-red)](https://mosquitto.org/)
[![React](https://img.shields.io/badge/React-18-cyan)](https://react.dev/)

> **Complete IoT monitoring and control system for UTS Pemrograman IoT**  
> Real-time sensor data collection via MQTT, MySQL analytics, and React dashboard

---

## 🎯 Project Overview

This project implements a **production-ready IoT system** that:
- ✅ Collects sensor data (temperature, humidity, light) from ESP32 via MQTT
- ✅ Stores data in MySQL with optimized schema
- ✅ Computes analytics matching exact UTS requirements
- ✅ Provides REST API with JSON format validation
- ✅ Displays real-time dashboard with React
- ✅ Controls IoT devices (pump) remotely via MQTT

---

## 📸 Screenshots

### Dashboard
![Dashboard Preview](https://via.placeholder.com/800x400?text=Dashboard+Preview)

### API Response
```json
{
  "suhumax": 36,
  "suhumin": 21,
  "suhurata": 28.35,
  "nilai_suhu_max_humid_max": [...],
  "month_year_max": [...]
}
```

---

## 🏗️ Architecture

```
ESP32 → MQTT Broker → Express Backend → MySQL
                           ↓
                      REST API
                           ↓
                    React Frontend
```

**Technologies:**
- **Backend:** Node.js, Express.js, MySQL2, MQTT.js, Winston
- **Frontend:** React 18, Vite, Axios
- **Database:** MySQL 8.x
- **Broker:** Mosquitto MQTT
- **Deployment:** Local + Ngrok/Cloudflare tunnel

---

## ⚡ Quick Start

### Prerequisites
- Node.js v18+ ([Download](https://nodejs.org/))
- MySQL 8.x ([Download](https://dev.mysql.com/downloads/))
- Mosquitto MQTT ([Download](https://mosquitto.org/download/))

### Installation (3 steps)

```powershell
# 1. Setup environment
Copy-Item .env.example .env
notepad .env  # Add your MySQL password

# 2. Import database
mysql -u root -p < database\schema.sql

# 3. Install dependencies
cd backend; npm install; cd ..
cd frontend; npm install; cd ..
```

### Run (3 terminals)

```powershell
# Terminal 1: MQTT Broker
mosquitto -v

# Terminal 2: Backend
cd backend
npm start

# Terminal 3: Frontend
cd frontend
npm run dev
```

**Open browser:** http://localhost:5173 🎉

---

## 📚 Documentation

- **[QUICKSTART.md](QUICKSTART.md)** - 5-minute setup guide
- **[docs/README.md](docs/README.md)** - Complete documentation
- **[docs/how_to_run_local.md](docs/how_to_run_local.md)** - Detailed local setup
- **[docs/api_examples.md](docs/api_examples.md)** - CURL/Postman examples
- **[docs/demo_script.txt](docs/demo_script.txt)** - YouTube video script

---

## 📡 MQTT Topics

### Sensor Data (ESP32 → Backend)
**Topic:** `iot/uas/sensor`

**Payload:**
```json
{
  "suhu": 32.5,
  "humidity": 65.3,
  "lux": 450,
  "timestamp": "2024-11-07 14:30:00"
}
```

### Pump Control (Backend → ESP32)
**Topic:** `iot/uas/pompa`

**Payload:** `"ON"` or `"OFF"` (plain text)

---

## 🔌 API Endpoints

### Base URL: `http://localhost:3000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/report/json` | Analytics data (UTS format) |
| GET | `/data/recent?limit=50` | Recent sensor records |
| GET | `/data/:id` | Single record by ID |
| POST | `/control/pump` | Control pump (ON/OFF) |
| GET | `/control/pump/status` | Get pump state |

**Example:**
```bash
curl http://localhost:3000/api/report/json
```

See [docs/api_examples.md](docs/api_examples.md) for complete examples.

---

## 🗄️ Database Schema

```sql
CREATE TABLE data_sensor (
    id INT AUTO_INCREMENT PRIMARY KEY,
    suhu FLOAT NOT NULL,
    humidity FLOAT NOT NULL,
    lux INT NOT NULL,
    timestamp DATETIME NOT NULL,
    INDEX idx_timestamp (timestamp),
    INDEX idx_suhu (suhu)
);
```

---

## 🧪 Testing

### Run Verification Script
```powershell
cd backend
npm test
```

### Publish Test Data
```powershell
cd tools
node publish_test.js
```

### Manual Testing with MQTT Explorer
1. Download [MQTT Explorer](http://mqtt-explorer.com/)
2. Connect to `localhost:1883`
3. Publish to `iot/uas/sensor`:
   ```json
   {"suhu":30,"humidity":70,"lux":400}
   ```

---

## 📱 ESP32 Integration

### Arduino Example

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

const char* mqtt_server = "YOUR_MQTT_SERVER";
const int mqtt_port = 1883;

void publishSensorData() {
  StaticJsonDocument<200> doc;
  doc["suhu"] = 32.5;
  doc["humidity"] = 65.3;
  doc["lux"] = 450;
  
  char buffer[200];
  serializeJson(doc, buffer);
  client.publish("iot/uas/sensor", buffer);
}

void callback(char* topic, byte* payload, unsigned int length) {
  if (String(topic) == "iot/uas/pompa") {
    String message = String((char*)payload).substring(0, length);
    if (message == "ON") {
      digitalWrite(PUMP_PIN, HIGH);
    } else {
      digitalWrite(PUMP_PIN, LOW);
    }
  }
}
```

### Remote Access

**Option 1: Ngrok (Easiest)**
```powershell
ngrok tcp 1883
# Use: 0.tcp.ngrok.io:12345
```

**Option 2: Local Network**
```powershell
ipconfig  # Use your IPv4 address
# Use: 192.168.1.100:1883
```

---

## 🎥 Demo Video Checklist

Before recording:
- [ ] Mosquitto running
- [ ] Backend running (check logs)
- [ ] Frontend running (test in browser)
- [ ] MQTT Explorer connected
- [ ] Sample data in database
- [ ] Browser tabs prepared
- [ ] ESP32 connected (optional)

**What to show:**
1. ✅ Start all services
2. ✅ Open dashboard showing stats
3. ✅ Publish MQTT message
4. ✅ Show DB insertion in logs
5. ✅ Refresh dashboard
6. ✅ Open `/api/report/json`
7. ✅ Copy to jsoneditoronline.org
8. ✅ Click Pump ON
9. ✅ Show MQTT message received
10. ✅ Show ESP32 reacting (if available)

See [docs/demo_script.txt](docs/demo_script.txt) for full script.

---

## 🛠️ Troubleshooting

### Backend won't start
```
❌ Error: ECONNREFUSED 3306
```
**Fix:** Start MySQL service
```powershell
net start MySQL80
```

### MQTT connection failed
```
❌ Error: ECONNREFUSED 1883
```
**Fix:** Start Mosquitto
```powershell
mosquitto -v
```

### Frontend API errors
**Fix:** Check backend is running on port 3000 and `.env` has correct `FRONTEND_URL`

### No data in analytics
**Fix:** Import sample data
```powershell
mysql -u root -p < database\schema.sql
```

---

## 📂 Project Structure

```
Website/
├── backend/          # Express.js API + MQTT subscriber
│   ├── src/
│   │   ├── app.js
│   │   ├── db.js
│   │   ├── mqtt.js
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── utils/
│   ├── server.js
│   └── package.json
├── frontend/         # React dashboard
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   └── services/
│   ├── public/
│   └── package.json
├── database/         # SQL schema + seed data
│   ├── schema.sql
│   └── seed_generator.js
├── tools/            # Testing utilities
│   ├── publish_test.js
│   └── verify_setup.js
├── docs/             # Documentation
│   ├── README.md
│   ├── how_to_run_local.md
│   ├── api_examples.md
│   └── demo_script.txt
├── .env.example      # Environment template
├── .gitignore
├── QUICKSTART.md     # Fast setup guide
└── README.md         # This file
```

---

## 🔐 Security

- ✅ Parameterized SQL queries (injection-safe)
- ✅ Environment variables for secrets
- ✅ CORS configuration
- ✅ Input validation on all MQTT payloads
- ✅ Error handling & logging

**For Production:**
- Add authentication (JWT)
- Implement rate limiting
- Use HTTPS/WSS
- Add database connection pooling
- Implement MQTT ACL

---

## 📝 Environment Variables

Create `.env` from `.env.example`:

```env
# Database
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=iot_uts

# MQTT
MQTT_URL=mqtt://localhost
MQTT_PORT=1883
MQTT_USER=
MQTT_PASS=

# Server
PORT=3000
FRONTEND_URL=http://localhost:5173

# Analytics
MAX_ROWS_NILAI_SUHU_MAX=2
LOG_LEVEL=info
```

---

## 🤝 Contributing

This is a UTS assignment project. Educational use only.

### Development
```powershell
# Install all dependencies
npm run install:all

# Run tests
npm test

# Verify setup
npm run verify
```

---

## 📄 License

MIT License - See LICENSE file for details.

---

## 👨‍💻 Author

**UTS Pemrograman IoT**  
Complete IoT System Implementation

---

## 🔗 Useful Links

- [Node.js Docs](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/)
- [MQTT.js API](https://github.com/mqttjs/MQTT.js)
- [React Documentation](https://react.dev/)
- [MySQL Reference](https://dev.mysql.com/doc/refman/8.0/)
- [Mosquitto Docs](https://mosquitto.org/documentation/)
- [JSON Editor Online](https://jsoneditoronline.org/)

---

## ⭐ Features Checklist

- [x] MQTT subscriber with auto-reconnect
- [x] MySQL integration with optimized queries
- [x] REST API matching exact UTS format
- [x] React dashboard with real-time updates
- [x] Pump control via MQTT
- [x] Input validation & error handling
- [x] Comprehensive logging (Winston)
- [x] CORS configuration
- [x] Sample data generator
- [x] Testing utilities
- [x] Complete documentation
- [x] Video demo script
- [x] ESP32 integration examples

---

**Ready to run?** See [QUICKSTART.md](QUICKSTART.md) for fastest setup! 🚀

**Need help?** Check [docs/how_to_run_local.md](docs/how_to_run_local.md) for detailed guide.

**Want to test?** Run `npm test` or `node tools/publish_test.js`

---

*Built with ❤️ for UTS Pemrograman IoT*
