# UTS IoT Project - Quick Start Guide

## 🚀 Fastest Way to Get Running

### Prerequisites Check
```powershell
node --version   # Should be v18+
mysql --version  # Should be 8.x
mosquitto --help # Should show help
```

### 1. Setup (First Time Only)

```powershell
# 1. Configure environment
Copy-Item .env.example .env
notepad .env  # Edit with your MySQL password

# 2. Create database
mysql -u root -p < database\schema.sql

# 3. Install dependencies
cd backend; npm install; cd ..
cd frontend; npm install; cd ..
```

### 2. Start Everything (Every Time)

Open 3 PowerShell terminals:

**Terminal 1 - MQTT Broker:**
```powershell
mosquitto -v
```

**Terminal 2 - Backend:**
```powershell
cd backend
npm start
```

**Terminal 3 - Frontend:**
```powershell
cd frontend
npm run dev
```

### 3. Test It

```powershell
# Open browser: http://localhost:5173
# You should see the dashboard with sample data

# Test MQTT (Terminal 4):
cd tools
node publish_test.js
```

### 4. Verify

```powershell
cd backend
npm test
```

---

## 📱 ESP32 Quick Setup

1. **Get MQTT Broker URL:**
   ```powershell
   # Option A: Local network (ESP32 on same WiFi)
   ipconfig  # Note your IPv4 address
   # Use: mqtt://<your-ip>:1883
   
   # Option B: Internet access (ESP32 anywhere)
   ngrok tcp 1883
   # Use the forwarded URL
   ```

2. **Arduino Code:**
   ```cpp
   const char* mqtt_server = "YOUR_MQTT_SERVER";
   const int mqtt_port = 1883;
   const char* sensor_topic = "iot/uas/sensor";
   const char* pump_topic = "iot/uas/pompa";
   ```

3. **Publish Format:**
   ```cpp
   {"suhu":30.5,"humidity":65.2,"lux":450}
   ```

---

## 🎬 For Demo Video

Before recording:
1. ✅ All services running
2. ✅ Sample data in database
3. ✅ MQTT Explorer connected
4. ✅ Browser tabs open:
   - http://localhost:5173 (Dashboard)
   - http://localhost:3000/api/report/json
   - https://jsoneditoronline.org

---

## ❓ Quick Troubleshooting

| Error | Fix |
|-------|-----|
| `ECONNREFUSED 3306` | Start MySQL: `net start MySQL80` |
| `ECONNREFUSED 1883` | Start Mosquitto: `mosquitto -v` |
| `Access denied` | Check `.env` password |
| `Table doesn't exist` | Run: `mysql -u root -p < database\schema.sql` |
| Frontend errors | Check backend is on port 3000 |

---

## 📊 URLs Reference

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api
- **Analytics:** http://localhost:3000/api/report/json
- **Health Check:** http://localhost:3000/health

---

**Need more help?** See [docs/how_to_run_local.md](docs/how_to_run_local.md)
