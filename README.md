# 🌡️ SISTEM MONITORING & KONTROL IoT - UTS Pemrograman IoT

<div align="center">

![ESP32](https://img.shields.io/badge/ESP32-DevKit-blue?style=for-the-badge&logo=espressif)
![PlatformIO](https://img.shields.io/badge/PlatformIO-Core-orange?style=for-the-badge&logo=platformio)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-green?style=for-the-badge&logo=node.js)
![React](https://img.shields.io/badge/React-18-cyan?style=for-the-badge&logo=react)
![MQTT](https://img.shields.io/badge/MQTT-Mosquitto-red?style=for-the-badge&logo=mqtt)
![MySQL](https://img.shields.io/badge/MySQL-8.x-blue?style=for-the-badge&logo=mysql)

**Sistem IoT Lengkap untuk Monitoring Sensor Real-Time dan Kontrol Perangkat**

📦 **Repository:** https://github.com/fathurp01/Sistem-Monitoring-Kontrol-IoT---UTS-Pemrograman-IoT

🌐 **Wokwi Project:** https://wokwi.com/projects/446768718203273217

##

[![Watch Demo](https://img.shields.io/badge/🎬_TONTON_VIDEO_DEMO-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://drive.google.com/LINK_VIDEO_DEMO)
[![Wokwi Simulation](https://img.shields.io/badge/🖥️_WOKWI_SIMULATION-green?style=for-the-badge&logo=arduino&logoColor=white)](https://wokwi.com/projects/446768718203273217)

*Klik untuk melihat demo lengkap sistem IoT monitoring dan kontrol pompa | Coba simulasi ESP32 di Wokwi*

</div>

---

## 📋 IDENTITAS MAHASISWA

| **Informasi** | **Detail** |
|---------------|------------|
| **Nama Lengkap** | Fathurrahman Pratama Putra |
| **NIM** | 152023057 |
| **Kelas** | EE |
| **Program Studi** | Informatika |
| **Mata Kuliah** | Pemrograman IoT |
| **Dosen Pengampu** | Galih Ashari R., S.Si., MT |
| **Institusi** | Institut Teknologi Nasional Bandung |
| **Semester** | Ganjil 2025/2026 |
| **Tugas** | UTS (Ujian Tengah Semester) |
| **Tanggal Pengumpulan** | 11 November 2025 |

---

## 📖 TENTANG PROYEK

**Sistem Monitoring & Kontrol IoT** adalah aplikasi IoT full-stack yang dikembangkan sebagai pemenuhan tugas **Ujian Tengah Semester (UTS)** mata kuliah Pemrograman IoT. 

Sistem ini mengintegrasikan simulasi ESP32 di **Wokwi Website**, protokol MQTT dengan **Ngrok port forwarding**, backend Node.js, database MySQL, dan dashboard React untuk menciptakan solusi monitoring sensor real-time dan kontrol perangkat jarak jauh yang lengkap dan profesional.

### 🎯 Arsitektur Deployment

**Setup yang Digunakan:**
- 🌐 **Wokwi Website** - Simulasi ESP32 dengan akses internet
- 🔌 **Ngrok TCP Tunnel** - Port forwarding local MQTT broker ke internet
- 🐝 **Mosquitto Local** - MQTT broker berjalan di localhost
- 📊 **MQTTBox** - Tool untuk monitoring dan testing MQTT messages
- 💻 **Backend Local** - Node.js server di localhost
- 🗄️ **MySQL Local** - Database di localhost
- 🌐 **React Dashboard** - Frontend di localhost:3000

**Alur Koneksi:**
```
Wokwi Website (ESP32 Simulation)
    ↓ WiFi Internet
    ↓ MQTT Connect to ngrok URL (0.tcp.ap.ngrok.io:PORT)
    ↓
Ngrok Tunnel (Port Forwarding)
    ↓ Forward to localhost:1883
    ↓
Mosquitto (Local MQTT Broker)
    ↓ Subscribe/Publish
    ↓
Backend Node.js (localhost:5000)
    ↓ Save data
    ↓
MySQL Database (localhost:3306)
    ↓ Query data
    ↑
React Dashboard (localhost:3000)
```

### 🎯 Tujuan Pembelajaran

Proyek ini bertujuan untuk mendemonstrasikan kemampuan dalam:
- ✅ Pemrograman **ESP32** dengan sensor DHT11 dan LDR
- ✅ Implementasi protokol **MQTT** untuk komunikasi IoT
- ✅ Pengembangan **Backend API** dengan Node.js dan Express
- ✅ Integrasi **Database MySQL** untuk penyimpanan data sensor
- ✅ Pembuatan **Dashboard React** untuk visualisasi data real-time
- ✅ Kontrol perangkat **jarak jauh** melalui MQTT publish/subscribe
- ✅ Penerapan **arsitektur IoT** yang scalable dan maintainable

### 🎯 Checklist Penyelesaian Soal UTS

- ✅ **Nomor 1a**: Script backend menghasilkan JSON dengan format yang benar
- ✅ **Nomor 1b**: Validasi struktur JSON di jsoneditoronline.org
- ✅ **Nomor 1c**: Parser JSON menampilkan data di user interface
- ✅ **Nomor 2a**: Hasil parsing ditampilkan dengan format yang rapi di aplikasi
- ✅ **Nomor 2b**: Perhitungan analitik (rata-rata, min, max, total data)
- ✅ **Video Demo**: Link video demo di PDF jawaban menunjukkan semua fitur
- ✅ **GitHub Repository**: File backend dan projek tersimpan di GitHub
- ✅ **Documentation**: README lengkap dengan screenshot dan penjelasan

---

## � FITUR-FITUR SISTEM

### 1️⃣ **ESP32 Firmware (Embedded System)**

**Platform:** PlatformIO + Arduino Framework  
**Microcontroller:** ESP32 DevKit

**Sensor yang Digunakan:**
- 🌡️ **DHT11**: Sensor suhu dan kelembaban udara
- 💡 **LDR**: Light Dependent Resistor untuk deteksi cahaya
- 🔌 **Relay**: Modul relay untuk kontrol pompa air

**Fitur ESP32:**
- ✅ **WiFi Connectivity**: Koneksi ke jaringan WiFi (support 2.4GHz)
- ✅ **MQTT Client**: Publish data sensor & subscribe command kontrol
- ✅ **JSON Serialization**: Format data sensor ke JSON menggunakan ArduinoJson
- ✅ **Auto Reconnect**: Otomatis reconnect WiFi dan MQTT jika terputus
- ✅ **Real-time Sampling**: Kirim data setiap 5 detik
- ✅ **Device Control**: Terima perintah ON/OFF untuk kontrol relay pompa
- ✅ **Serial Monitoring**: Debug via serial monitor (115200 baud)

**Pin Configuration:**
| Komponen | Pin ESP32 | Fungsi |
|----------|-----------|--------|
| DHT11 Data | GPIO 25 | Baca suhu & kelembaban |
| LDR Analog | GPIO 34 (ADC) | Baca intensitas cahaya |
| Relay Control | GPIO 14 | Kontrol pompa ON/OFF |

**MQTT Topics:**
- **Publish**: `iot/uas/sensor` → Kirim data sensor (JSON)
- **Subscribe**: `iot/uas/pompa` → Terima command kontrol (`ON` / `OFF`)

**Format JSON Data Sensor:**
```json
{
  "temperature": 28.5,
  "humidity": 65,
  "light": 512
}
```

---

### 2️⃣ **Backend Server (Node.js + Express)**

**Technology Stack:**
- 🟢 **Node.js**: JavaScript runtime
- 🚂 **Express.js**: Web framework untuk REST API
- 🐝 **MQTT.js**: Client MQTT untuk komunikasi dengan ESP32
- 🐬 **MySQL2**: Database driver untuk MySQL

**Fitur Backend:**
- ✅ **MQTT Subscriber**: Listen data sensor dari ESP32
- ✅ **Data Persistence**: Simpan data sensor ke database MySQL
- ✅ **REST API**: Endpoint untuk frontend mengambil data
- ✅ **Analytics Engine**: Hitung rata-rata, min, max, count
- ✅ **Device Control API**: Endpoint untuk kontrol pompa
- ✅ **MQTT Publisher**: Publish command ke ESP32
- ✅ **CORS Enabled**: Support cross-origin requests
- ✅ **Error Handling**: Proper error messages dan logging
- ✅ **Environment Config**: Support .env untuk konfigurasi

**REST API Endpoints:**

| Method | Endpoint | Deskripsi | Response |
|--------|----------|-----------|----------|
| GET | `/api/sensor/latest` | Data sensor terbaru | JSON object |
| GET | `/api/sensor/history` | Riwayat data sensor | JSON array |
| GET | `/api/sensor/stats` | Analitik (avg, min, max) | JSON object |
| POST | `/api/pump/control` | Kontrol pompa ON/OFF | Status message |

**Contoh Response `/api/sensor/stats`:**
```json
{
  "average_temperature": 28.5,
  "average_humidity": 65.2,
  "average_light": 523.7,
  "min_temperature": 25.0,
  "max_temperature": 32.0,
  "total_records": 150
}
```

---

### 3️⃣ **Database (MySQL)**

**Database Name:** `iot_monitoring`  
**Table:** `sensor_data`

**Schema:**
```sql
CREATE TABLE sensor_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  temperature FLOAT NOT NULL,
  humidity FLOAT NOT NULL,
  light INT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_timestamp (timestamp)
);
```

**Fitur Database:**
- ✅ **Auto Increment ID**: Primary key otomatis
- ✅ **Timestamp Indexing**: Query cepat berdasarkan waktu
- ✅ **Data Validation**: Constraint untuk tipe data
- ✅ **Historical Storage**: Simpan semua data untuk analisis
- ✅ **Optimized Queries**: Index untuk performa query

---

### 4️⃣ **Frontend Dashboard (React)**

**Framework:** React 18 with Create React App  
**UI Library:** Material-UI (MUI)

**Fitur Dashboard:**
- ✅ **Real-time Data Display**: Tampilkan data sensor terkini
- ✅ **Line Charts**: Grafik suhu, kelembaban, cahaya
- ✅ **Statistics Cards**: Card untuk avg, min, max values
- ✅ **Pump Control Panel**: Tombol ON/OFF untuk kontrol pompa
- ✅ **Auto Refresh**: Update data setiap 5 detik
- ✅ **Responsive Design**: Support desktop dan mobile
- ✅ **Loading States**: Skeleton dan loading indicators
- ✅ **Error Handling**: User-friendly error messages

**Halaman Dashboard:**
1. **Overview** - Summary cards dengan data terkini
2. **Charts** - Grafik historical data
3. **Control Panel** - Kontrol perangkat (pompa)
4. **History Table** - Tabel riwayat data sensor

---

### 5️⃣ **MQTT Setup dengan Ngrok Port Forwarding**

**Arsitektur yang Digunakan:**

```
┌─────────────────────────────────────────────────────────────────┐
│                    MQTT CONNECTION FLOW                         │
└─────────────────────────────────────────────────────────────────┘

🌐 Wokwi Website (https://wokwi.com)
   │ ESP32 Simulation running
   │ WiFi: Wokwi-GUEST (internet access)
   │
   ├─► MQTT Connect to: 0.tcp.ap.ngrok.io:14066
   │
   ▼
🌍 Internet
   │
   ▼
🔌 Ngrok TCP Tunnel (ngrok tcp 1883)
   │ Forwarding: 0.tcp.ap.ngrok.io:14066 → localhost:1883
   │ Status: https://dashboard.ngrok.com
   │
   ▼
🐝 Mosquitto Broker (localhost:1883)
   │ Running on local machine
   │ Topics: iot/uas/sensor, iot/uas/pompa
   │
   ├─► Backend Node.js (localhost:5000)
   │   └─► MySQL (localhost:3306)
   │
   └─► MQTTBox (localhost:1883)
       └─► Monitor & Test MQTT Messages
```

**Komponen yang Digunakan:**

1. **Wokwi Website** (https://wokwi.com)
   - Simulasi ESP32 online
   - Akses internet penuh
   - Bisa connect ke ngrok URL

2. **Mosquitto** (localhost:1883)
   - MQTT broker lokal
   - Download: https://mosquitto.org/download/
   - Config default: no authentication

3. **Ngrok** (Port Forwarding)
   - Forward localhost:1883 ke internet
   - Download: https://ngrok.com/download
   - Free tier: 1 online ngrok process

4. **MQTTBox** (MQTT Client Tool)
   - GUI tool untuk test MQTT
   - Download: http://workswithweb.com/mqttbox.html
   - Connect ke localhost:1883
   - Monitor semua message di topic iot/uas/*

**Setup Lengkap:**

#### Step 1: Install Mosquitto
```powershell
# Download dari https://mosquitto.org/download/
# Install dengan default settings
# Mosquitto akan jalan sebagai Windows Service
```

#### Step 2: Start Mosquitto Broker
```powershell
# Cara 1: Via Service (recommended)
net start mosquitto

# Cara 2: Manual (untuk melihat logs)
cd "C:\Program Files\mosquitto"
mosquitto -v

# Output yang diharapkan:
# 1699999999: mosquitto version 2.x starting
# 1699999999: Opening ipv4 listen socket on port 1883
# 1699999999: mosquitto running
```

#### Step 3: Setup Ngrok Tunnel
```powershell
# Download ngrok dari https://ngrok.com/download
# Extract dan jalankan:

ngrok tcp 1883

# Output:
# Forwarding  tcp://0.tcp.ap.ngrok.io:14066 -> localhost:1883
#             ^^^^^^^^^^^^^^^^^^^^^^^^^^^
#             Copy URL dan PORT ini!
```

**PENTING:** Simpan ngrok URL dan port, akan digunakan di Wokwi!

#### Step 4: Setup MQTTBox
1. Download dan install MQTTBox
2. Buat MQTT Client connection:
   - **Name**: Local Mosquitto
   - **Protocol**: mqtt/tcp
   - **Host**: localhost:1883
   - **Username/Password**: kosongkan
3. Subscribe to topics:
   - `iot/uas/sensor` - Lihat data dari ESP32
   - `iot/uas/pompa` - Lihat command ke ESP32
4. Publish test message:
   - Topic: `iot/uas/pompa`
   - Payload: `ON` atau `OFF`

---

## 🏗️ ARSITEKTUR SISTEM

### Diagram Sistem Lengkap dengan Ngrok

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    SISTEM MONITORING IoT DENGAN NGROK                      │
└────────────────────────────────────────────────────────────────────────────┘

🌐 INTERNET / CLOUD
   │
   │  ┌─────────────────────────────────────┐
   │  │  🖥️  Wokwi Website                   │
   │  │  https://wokwi.com                  │
   │  │                                     │
   │  │  ┌───────────────────────────┐     │
   │  │  │   ESP32 Simulation        │     │
   │  │  │   • DHT11 (Temp/Humidity) │     │
   │  │  │   • LDR (Light Sensor)    │     │
   │  │  │   • Relay (Pump Control)  │     │
   │  │  │   • WiFi: Wokwi-GUEST     │     │
   │  │  └───────────────────────────┘     │
   │  │         │                           │
   │  │         │ MQTT Publish              │
   │  │         │ Topic: iot/uas/sensor     │
   │  │         │ {"temp":28,"humid":65}    │
   │  │         ▼                           │
   │  │  MQTT: 0.tcp.ap.ngrok.io:14066     │
   │  └─────────────────────────────────────┘
   │           │
   │           │ MQTT over Internet
   │           ▼
   ▼
🔌 NGROK TUNNEL (Port Forwarding)
   │  ngrok tcp 1883
   │  
   │  Forwarding: 0.tcp.ap.ngrok.io:14066 ──► localhost:1883
   │  Dashboard: https://dashboard.ngrok.com
   │
   ▼
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💻 LOCALHOST / LOCAL MACHINE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌────────────────────────────────────────────────────────────────────────┐
│  🐝 Mosquitto Broker (localhost:1883)                                  │
│                                                                        │
│  Topics:                                                               │
│  • iot/uas/sensor  ─► Data dari ESP32                                 │
│  • iot/uas/pompa   ─► Command ke ESP32                                │
└────────────────────────────────────────────────────────────────────────┘
        │                      │                         │
        │                      │                         │
        ▼                      ▼                         ▼
┌──────────────┐     ┌──────────────────┐     ┌─────────────────┐
│   MQTTBox    │     │  Backend Node.js │     │ React Dashboard │
│ (localhost:  │     │  (localhost:5000)│     │ (localhost:3000)│
│   1883)      │     │                  │     │                 │
│              │     │  ┌────────────┐  │     │  ┌──────────┐   │
│ • Subscribe  │     │  │ MQTT Client│  │     │  │  Charts  │   │
│   all topics │     │  │ Subscribe  │  │     │  │  Stats   │   │
│              │     │  │ iot/uas/*  │  │     │  │  Control │   │
│ • Publish    │     │  └────────────┘  │     │  └──────────┘   │
│   test msg   │     │                  │     │                 │
│              │     │  ┌────────────┐  │     │  HTTP API       │
│ • Monitor    │     │  │ Express API│  │◄────┤  GET/POST       │
│   messages   │     │  │ /api/*     │  │     │  Requests       │
└──────────────┘     │  └────────────┘  │     └─────────────────┘
                     │         │         │
                     │         │ SQL     │
                     │         ▼         │
                     │  ┌────────────┐   │
                     │  │   MySQL    │   │
                     │  │ iot_monitor│   │
                     │  │ sensor_data│   │
                     │  └────────────┘   │
                     └──────────────────┘
```

### 📊 Alur Kerja Sistem (Data Flow)

**1. Pengiriman Data Sensor (ESP32 → Backend)**
```
ESP32 Sensors → JSON Encoding → MQTT Publish → MQTT Broker 
→ Backend Subscribe → Parse JSON → MySQL Insert
```

**2. Visualisasi Data (Frontend ← Backend)**
```
User Access Dashboard → HTTP GET Request → Backend Query MySQL 
→ JSON Response → React Parse & Display Charts
```

**3. Kontrol Perangkat (Frontend → ESP32)**
```
User Click Button → HTTP POST → Backend Validate → MQTT Publish 
→ ESP32 Subscribe → Relay Control → Pump ON/OFF
```

**4. Analitik Data (Dashboard)**
```
Backend Query → Calculate AVG/MIN/MAX → JSON Response 
→ Display Statistics Cards
```

---

## ✨ Features

### ESP32 Firmware
- 📡 WiFi connectivity (local/Wokwi)
- 🌡️ DHT11 temperature & humidity sensor
- 💡 LDR light sensor
- 🔌 Relay control for pump
- 📤 Publishes sensor data as JSON every 5 seconds
- 📥 Subscribes to pump control commands
- 🔄 Auto-reconnect to WiFi & MQTT

### Backend (Node.js)
- 🐝 MQTT client (supports HiveMQ, Mosquitto, Ngrok tunnels)
- 💾 MySQL data persistence
- 📊 Analytics API (avg, min, max, count)
- 🔌 Device control API
- 🛡️ Input validation & error handling
- 📝 Logging system

### Frontend (React)
- 📈 Real-time sensor charts
- 🎛️ Device control panel
- 📊 Historical data view
- 🎨 Responsive UI design
- 🔄 Auto-refresh data

---

## 📁 Project Structure

```
UTS_PemIoT/
├── ESP32/                          # ESP32 Firmware (PlatformIO)
│   ├── src/
│   │   └── main.cpp               # Main ESP32 code
│   ├── platformio.ini             # PlatformIO configuration
│   ├── wokwi.toml                 # Wokwi simulator config
│   └── diagram.json               # Wokwi circuit diagram
│
├── Website/                        # Web Application
│   ├── backend/                   # Node.js Backend
│   │   ├── server.js             # Express server + MQTT client
│   │   ├── db.js                 # MySQL connection
│   │   └── package.json
│   ├── frontend/                  # React Dashboard
│   │   ├── src/
│   │   │   ├── App.js           # Main React app
│   │   │   └── components/      # React components
│   │   └── package.json
│   ├── database/                  # Database schema
│   │   └── schema.sql
│   └── README.md                  # Detailed website documentation
│
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

---

## 🔧 Prerequisites

### Hardware
- ESP32 development board
- DHT11 temperature & humidity sensor
- LDR (Light Dependent Resistor)
- Relay module (for pump control)
- Jumper wires
- USB cable (for ESP32)

### Software
- **PlatformIO** (VS Code extension or CLI)
- **Node.js** v18+ and npm
- **MySQL** 8.x
- **MQTT Broker** (choose one):
  - Mosquitto (local)
  - HiveMQ Cloud (public)
  - Ngrok tunnel to local Mosquitto

---

## �️ TEKNOLOGI & DEPENDENCIES

### Hardware
- **ESP32 DevKit** - Microcontroller dengan WiFi built-in
- **DHT11** - Sensor suhu dan kelembaban
- **LDR** - Light Dependent Resistor
- **Relay Module** - 1 Channel 5V
- **Breadboard & Jumper Wires**
- **Power Supply** - USB cable atau adapter 5V

### Software & Tools
- **PlatformIO Core** - Build system untuk ESP32
- **Node.js** v18+ - JavaScript runtime untuk backend
- **MySQL** 8.x - Relational database
- **Mosquitto** atau **HiveMQ** - MQTT broker
- **Ngrok** (optional) - Tunneling untuk local MQTT broker
- **VS Code** - Code editor dengan extension PlatformIO

### ESP32 Libraries (platformio.ini)
```ini
lib_deps = 
    knolleary/PubSubClient@^2.8        # MQTT client
    bblanchon/ArduinoJson@^7.4.2       # JSON serialization
    adafruit/DHT sensor library@^1.4.6 # DHT11 sensor
    amcewen/HttpClient@^2.2.0          # HTTP client
```

### Backend Dependencies (package.json)
```json
"dependencies": {
  "express": "^4.18.2",           // Web framework
  "mysql2": "^3.6.0",             // MySQL client
  "mqtt": "^5.0.0",               // MQTT client
  "cors": "^2.8.5",               // Cross-origin support
  "dotenv": "^16.3.1",            // Environment variables
  "body-parser": "^1.20.2"        // Request parser
}
```

### Frontend Dependencies
```json
"dependencies": {
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "axios": "^1.5.0",              // HTTP client
  "@mui/material": "^5.14.0",     // Material-UI components
  "recharts": "^2.8.0"            // Chart library
}
```

---

## �🚀 CARA MENJALANKAN SISTEM

### Prasyarat

Pastikan sudah terinstall:
- ✅ [PlatformIO CLI](https://platformio.org/) atau Extension VS Code
- ✅ [Node.js](https://nodejs.org/) v18 atau lebih baru
- ✅ [MySQL](https://dev.mysql.com/downloads/mysql/) 8.x
- ✅ [Mosquitto](https://mosquitto.org/download/) (optional untuk local broker)
- ✅ [Git](https://git-scm.com/) untuk clone repository

---

### 1️⃣ Wokwi Website Setup (Simulasi ESP32)

⚠️ **PENTING**: Project ini menggunakan **Wokwi Website** untuk simulasi ESP32, bukan hardware fisik. Folder `ESP32/` hanya berisi referensi code untuk simulasi.

#### Langkah 1: Persiapkan Ngrok URL

Sebelum mulai simulasi Wokwi, pastikan Ngrok sudah running dan dapatkan URL-nya:

```powershell
# Jalankan Mosquitto di localhost (terminal 1)
mosquitto -v

# Jalankan Ngrok tunnel (terminal 2)
ngrok tcp 1883

# Output ngrok:
# Forwarding  tcp://0.tcp.ap.ngrok.io:14066 -> localhost:1883
#                   ^^^^^^^^^^^^^^^^^^^^^^
#                   Simpan URL dan PORT ini!
```

#### Langkah 2: Buka Wokwi Website

1. Kunjungi: **https://wokwi.com**
2. Login dengan akun Wokwi (buat akun gratis jika belum punya)
3. Klik **"New Project"** → Pilih **"ESP32"**

#### Langkah 3: Setup Code di Wokwi

Copy code dari `ESP32/src/main.cpp` atau gunakan code berikut dengan **Ngrok URL Anda**:

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"
#include <ArduinoJson.h>

// ------------------- CONFIG -------------------
#define DHTPIN 25
#define DHTTYPE DHT11
#define LDR_PIN 34
#define RELAY_PIN 14

// WiFi (Wokwi default - JANGAN DIUBAH)
const char* ssid = "Wokwi-GUEST";  
const char* password = "";

// MQTT Broker - GANTI DENGAN NGROK URL ANDA!
const char* mqtt_server = "0.tcp.ap.ngrok.io";
const int mqtt_port = 14066;  // <-- Ganti dengan port ngrok Anda

// MQTT Topics
const char* pubTopic = "iot/uas/sensor";
const char* subTopic = "iot/uas/pompa";

// ... (sisa code sama seperti di ESP32/src/main.cpp)
```

**PENTING:** Ganti `mqtt_server` dan `mqtt_port` dengan ngrok URL Anda!

#### Langkah 4: Setup Circuit di Wokwi

1. Klik **"diagram.json"** atau **"Add Part"**
2. Tambahkan komponen:
   - **ESP32** (sudah ada by default)
   - **DHT22** (atau DHT11 jika tersedia)
   - **Photoresistor (LDR)**
   - **Relay Module** (atau LED untuk simulasi)
   
3. Wire connections:
   - DHT22 Data → GPIO 25
   - LDR → GPIO 34 (ADC)
   - Relay/LED → GPIO 14

Atau copy `diagram.json` dari folder `ESP32/diagram.json` ke Wokwi editor.

#### Langkah 5: Install Libraries di Wokwi

Klik **"Library Manager"** dan tambahkan:
- `PubSubClient` by Nick O'Leary
- `DHT sensor library` by Adafruit
- `ArduinoJson` by Benoit Blanchon

#### Langkah 6: Jalankan Simulasi

1. Klik tombol **▶️ Start Simulation**
2. Tunggu ESP32 connect ke WiFi dan MQTT
3. Lihat Serial Monitor di Wokwi:

```
Connecting to WiFi...
..
WiFi Connected!
IP Address: 10.13.37.2
Attempting MQTT Connection...Connected!
Subscribed to: iot/uas/pompa
Published: {"temperature":28.5,"humidity":65,"light":512}
```

4. Jika berhasil connect, data akan muncul di:
   - MQTTBox (subscribe ke `iot/uas/sensor`)
   - Backend logs (jika sudah running)
   - MySQL database

#### Langkah 7: Test Kontrol Pompa

Dari MQTTBox atau backend, publish message:
- **Topic**: `iot/uas/pompa`
- **Payload**: `ON` atau `OFF`

Lihat Serial Monitor Wokwi untuk konfirmasi:
```
MQTT Message [iot/uas/pompa] : ON
Pompa: ON
```

---

### 1️⃣-B. Alternative: ESP32 Hardware (Optional)

**Jika ingin menggunakan ESP32 fisik** (bukan simulasi Wokwi), ikuti langkah ini:

#### Install PlatformIO
```powershell
pip install platformio
```

#### Build & Upload
```powershell
cd ESP32/UTS\ PemrogIoT
pio run
pio run --target upload --upload-port COM3
pio device monitor --port COM3
```

**Note:** Setup ngrok sama seperti untuk Wokwi Website.

---

### 2️⃣ Database Setup (MySQL)

#### Langkah 1: Install MySQL
```powershell
# Windows: Download dari https://dev.mysql.com/downloads/mysql/
# Atau gunakan XAMPP/WAMP yang sudah include MySQL
```

#### Langkah 2: Buat Database dan Table
```powershell
# Login ke MySQL
mysql -u root -p

# Atau gunakan phpMyAdmin jika pakai XAMPP
```

```sql
-- Buat database
CREATE DATABASE iot_monitoring;

-- Gunakan database
USE iot_monitoring;

-- Buat table sensor_data
CREATE TABLE sensor_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  temperature FLOAT NOT NULL,
  humidity FLOAT NOT NULL,
  light INT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_timestamp (timestamp)
);

-- Cek table berhasil dibuat
DESCRIBE sensor_data;
```

#### Langkah 3: Verifikasi Database
```sql
-- Lihat semua database
SHOW DATABASES;

-- Lihat tables di database iot_monitoring
SHOW TABLES;
```

---

### 3️⃣ Backend Setup (Node.js + Express)

#### Langkah 1: Navigate ke Folder Backend
```powershell
cd Website/backend
```

#### Langkah 2: Install Dependencies
```powershell
# Install semua package dari package.json
npm install
```

#### Langkah 3: Konfigurasi Environment Variables
Buat file `.env` di folder `backend`:

```env
# MySQL Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=iot_monitoring
DB_PORT=3306

# MQTT Broker Configuration (localhost untuk connect ke Mosquitto lokal)
MQTT_BROKER=localhost
MQTT_PORT=1883
MQTT_USERNAME=
MQTT_PASSWORD=

# Server Configuration
PORT=5000
```

**PENTING:** 
- `MQTT_BROKER=localhost` → Backend connect ke Mosquitto lokal
- Wokwi connect ke ngrok URL → Ngrok forward ke Mosquitto
- Backend dan Wokwi bertemu di Mosquitto yang sama!

#### Langkah 4: Jalankan Backend Server
```powershell
# Start server
npm start

# Atau dengan nodemon (auto-restart saat code berubah)
npm run dev
```

**Expected Output:**
```
Server running on port 5000
Connected to MySQL database
Connected to MQTT broker: broker.hivemq.com
Subscribed to topic: iot/uas/sensor
```

#### Langkah 5: Test API Endpoints
Buka browser atau Postman:

```
GET  http://localhost:5000/api/sensor/latest
GET  http://localhost:5000/api/sensor/history
GET  http://localhost:5000/api/sensor/stats
POST http://localhost:5000/api/pump/control
     Body: {"status": "ON"}
```

---

### 4️⃣ Frontend Setup (React Dashboard)

#### Langkah 1: Navigate ke Folder Frontend
```powershell
cd Website/frontend
```

#### Langkah 2: Install Dependencies
```powershell
npm install
```

#### Langkah 3: Konfigurasi API Base URL
Edit file `src/config.js` (jika ada):

```javascript
export const API_BASE_URL = 'http://localhost:5000/api';
```

#### Langkah 4: Jalankan React Development Server
```powershell
npm start
```

**Expected Output:**
```
Compiled successfully!

You can now view the app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.100:3000
```

Browser akan otomatis membuka `http://localhost:3000`

---

### 5️⃣ MQTTBox Setup (MQTT Testing Tool)

MQTTBox digunakan untuk **monitor dan test MQTT messages** tanpa perlu code.

#### Langkah 1: Install MQTTBox

**Download:** http://workswithweb.com/mqttbox.html

- Windows: Download MQTTBox installer
- Install dengan default settings

#### Langkah 2: Buat MQTT Client Connection

1. Buka MQTTBox
2. Klik **"Create MQTT Client"**
3. Isi konfigurasi:

```
MQTT Client Name:  Local Mosquitto Monitor
Protocol:          mqtt/tcp
Host:              localhost:1883
Username:          (kosongkan)
Password:          (kosongkan)
```

4. Klik **"Save"** → Client akan auto-connect

✅ Jika berhasil, status akan **"Connected"**

#### Langkah 3: Subscribe ke Topics

Di MQTTBox client yang sudah connected:

1. Klik **"Add subscriber"**
2. **Topic**: `iot/uas/sensor`
3. **QoS**: 0
4. **Color**: Hijau (optional)
5. Klik **"Subscribe"**

Ulangi untuk topic kedua:
- **Topic**: `iot/uas/pompa`
- **Color**: Biru (optional)

#### Langkah 4: Monitor Messages

Setelah Wokwi running, MQTTBox akan menampilkan messages real-time:

**Topic: iot/uas/sensor** (dari ESP32)
```json
{"temperature":28.5,"humidity":65,"light":512}
{"temperature":28.7,"humidity":64,"light":508}
```

**Topic: iot/uas/pompa** (command ke ESP32)
```
ON
OFF
```

#### Langkah 5: Test Publish Manual

Untuk test kontrol pompa dari MQTTBox:

1. Klik **"Add publisher"**
2. **Topic to publish**: `iot/uas/pompa`
3. **Payload**: `ON`
4. Klik **"Publish"**

Cek Wokwi Serial Monitor untuk konfirmasi:
```
MQTT Message [iot/uas/pompa] : ON
Pompa: ON
```

Test dengan payload `OFF`:
```
MQTT Message [iot/uas/pompa] : OFF
Pompa: OFF
```

#### Tips MQTTBox:

✅ **Subscribe ke wildcard** untuk monitor semua topic:
- Topic: `iot/uas/#` (# = wildcard semua subtopics)

✅ **Save messages** untuk debugging:
- Klik icon download di message
- Messages tersimpan untuk review

✅ **Multiple clients** untuk simulasi:
- Buat client kedua untuk publish
- Client pertama untuk subscribe
- Test real-time communication

---

## 📖 CARA MENGGUNAKAN SISTEM

### 🎯 Workflow Lengkap: Wokwi Website + Ngrok + MQTTBox

Berikut adalah **alur kerja lengkap** sistem yang digunakan dalam project ini:

```
┌─────────────────────────────────────────────────────────────────────┐
│                         STARTUP SEQUENCE                            │
└─────────────────────────────────────────────────────────────────────┘

1️⃣  Start MySQL Service
     └─► MySQL running di localhost:3306

2️⃣  Start Mosquitto Broker
     └─► mosquitto -v (localhost:1883)
     └─► Mosquitto ready to accept connections

3️⃣  Start Ngrok Tunnel
     └─► ngrok tcp 1883
     └─► Get URL: 0.tcp.ap.ngrok.io:14066
     └─► Ngrok forward: internet → localhost:1883

4️⃣  Start MQTTBox
     └─► Connect to localhost:1883
     └─► Subscribe to iot/uas/sensor & iot/uas/pompa
     └─► Ready to monitor messages

5️⃣  Start Backend Server
     └─► npm start (localhost:5000)
     └─► Backend connect to localhost:1883 (Mosquitto)
     └─► Backend subscribe to iot/uas/sensor
     └─► Ready to receive data from ESP32

6️⃣  Start Frontend Dashboard
     └─► npm start (localhost:3000)
     └─► Dashboard connect to backend API
     └─► Ready to display data

7️⃣  Start Wokwi Simulation
     └─► Open https://wokwi.com project
     └─► Configure mqtt_server: 0.tcp.ap.ngrok.io:14066
     └─► Click ▶️ Start Simulation
     └─► ESP32 connect to WiFi → MQTT → Publish data
     └─► Data flow: Wokwi → Ngrok → Mosquitto → Backend → MySQL → Dashboard
```

---

### Urutan Startup yang Benar

**PENTING: Ikuti urutan ini agar sistem berjalan dengan baik**

#### Terminal 1: MySQL
```powershell
# Pastikan MySQL service running
net start MySQL80
# Atau cek di Services (Win+R → services.msc)
```

#### Terminal 2: Mosquitto
```powershell
cd "C:\Program Files\mosquitto"
mosquitto -v
# Jangan tutup terminal ini, biarkan running
```

#### Terminal 3: Ngrok
```powershell
ngrok tcp 1883
# Catat URL dan port (contoh: 0.tcp.ap.ngrok.io:14066)
# Jangan tutup terminal ini, biarkan running
```

#### Terminal 4: Backend
```powershell
cd Website/backend
npm start
# Tunggu sampai "Connected to MQTT broker: localhost"
```

#### Terminal 5: Frontend
```powershell
cd Website/frontend
npm start
# Browser akan otomatis buka http://localhost:3000
```

#### MQTTBox (Aplikasi terpisah)
1. Buka MQTTBox
2. Connect ke localhost:1883
3. Subscribe ke `iot/uas/#`

#### Wokwi Website (Browser)
1. Buka https://wokwi.com/projects/your-project-id
2. Update ngrok URL di code (mqtt_server dan mqtt_port)
3. Klik ▶️ Start Simulation
4. Monitor Serial Output untuk konfirmasi connection

---

### 🧪 Testing & Verifikasi Sistem

#### Test 1: Verifikasi Koneksi MQTT

**Di MQTTBox:**
1. Subscribe ke `iot/uas/#`
2. Lihat apakah ada message dari Wokwi setiap 5 detik
3. ✅ **PASS**: Jika muncul JSON sensor data
4. ❌ **FAIL**: Jika tidak ada message → cek ngrok dan Mosquitto

**Expected di MQTTBox:**
```
Topic: iot/uas/sensor
Payload: {"temperature":28.5,"humidity":65,"light":512}
Time: 10:30:00
```

#### Test 2: Verifikasi Backend Menerima Data

**Di Backend Terminal:**
```
[MQTT] Message received on iot/uas/sensor
[DB] Data saved successfully - ID: 150
```

✅ **PASS**: Backend log menunjukkan data diterima dan disimpan

#### Test 3: Verifikasi Database

```powershell
mysql -u root -p
USE iot_monitoring;
SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 5;
```

✅ **PASS**: Data baru muncul setiap 5 detik dengan timestamp terbaru

#### Test 4: Verifikasi Dashboard

1. Buka `http://localhost:3000`
2. Lihat apakah data muncul di cards
3. Lihat apakah chart ter-update
4. ✅ **PASS**: Data real-time muncul dan chart bergerak

#### Test 5: Test Kontrol Pompa

**Metode 1: Dari MQTTBox**
1. Publish ke topic `iot/uas/pompa`
2. Payload: `ON`
3. Cek Wokwi Serial Monitor: `Pompa: ON`
4. Publish payload: `OFF`
5. Cek Wokwi Serial Monitor: `Pompa: OFF`

**Metode 2: Dari Dashboard**
1. Klik button "Turn ON"
2. Cek MQTTBox: message `ON` muncul di topic `iot/uas/pompa`
3. Cek Wokwi Serial: `Pompa: ON`
4. Klik button "Turn OFF"
5. Konfirmasi message `OFF` di MQTTBox dan Wokwi

✅ **PASS**: Kontrol dari dashboard → Backend → MQTT → Wokwi works!

---

### 1️⃣ Monitoring Data Sensor

**Akses Dashboard:**
```
http://localhost:3000
```

**Yang Bisa Dilihat:**
- 🌡️ **Suhu Real-time**: Temperature terkini dari DHT11
- 💧 **Kelembaban Real-time**: Humidity percentage
- 💡 **Intensitas Cahaya**: Light level dari LDR (0-4095)
- 📊 **Grafik Historical**: Line chart 20 data terakhir
- 📈 **Statistics Cards**: 
  - Average temperature, humidity, light
  - Minimum values
  - Maximum values
  - Total data records
- ⏰ **Timestamp**: Waktu setiap pembacaan sensor

**Auto-refresh:** Dashboard otomatis refresh setiap 5 detik

**Di MQTTBox:**
- Real-time monitoring semua messages
- Filter by topic untuk debugging
- Export messages untuk analysis

---

### 2️⃣ Kontrol Pompa Jarak Jauh

**Cara Mengontrol:**
1. Buka dashboard di browser
2. Cari panel **"Pump Control"**
3. Klik tombol **"Turn ON"** → Pompa menyala
4. Klik tombol **"Turn OFF"** → Pompa mati

**Alur Kerja:**
```
User Click Button → HTTP POST /api/pump/control 
→ Backend Validate → MQTT Publish "ON"/"OFF" 
→ ESP32 Subscribe → digitalWrite(RELAY_PIN, HIGH/LOW) 
→ Relay Switch → Pump ON/OFF
```

**Status Indicator:**
- 🟢 **Green**: Pompa sedang ON
- 🔴 **Red**: Pompa sedang OFF

---

### 3️⃣ Melihat Log dan Debug

#### ESP32 Serial Monitor
```powershell
# Monitor output dari ESP32
pio device monitor --port COM3

# Output yang akan terlihat:
# Connecting to WiFi...
# WiFi Connected!
# IP Address: 192.168.1.100
# Attempting MQTT Connection...Connected!
# Subscribed to: iot/uas/pompa
# Published: {"temperature":28.5,"humidity":65,"light":512}
# MQTT Message [iot/uas/pompa] : ON
# Pompa: ON
```

#### Backend Server Logs
```powershell
cd Website/backend
npm start

# Output yang akan terlihat:
# Server running on port 5000
# Connected to MySQL database
# Connected to MQTT broker
# [MQTT] Message received on iot/uas/sensor
# [DB] Data saved: temp=28.5, humid=65, light=512
# [API] GET /api/sensor/latest - 200 OK
```

#### Browser Console (F12)
```javascript
// Lihat network requests di tab Network
// Lihat error messages di tab Console
```

---

### 4️⃣ Query Database Langsung

```powershell
# Login ke MySQL
mysql -u root -p

# Gunakan database
USE iot_monitoring;

# Lihat 10 data terbaru
SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 10;

# Hitung rata-rata suhu
SELECT AVG(temperature) as avg_temp FROM sensor_data;

# Lihat data 1 jam terakhir
SELECT * FROM sensor_data 
WHERE timestamp >= NOW() - INTERVAL 1 HOUR;

# Total records
SELECT COUNT(*) as total FROM sensor_data;
```

---

### 5️⃣ Testing API dengan Postman/cURL

#### Get Latest Sensor Data
```powershell
curl http://localhost:5000/api/sensor/latest
```

**Response:**
```json
{
  "id": 150,
  "temperature": 28.5,
  "humidity": 65.0,
  "light": 512,
  "timestamp": "2025-11-11T10:30:00.000Z"
}
```

#### Get Statistics
```powershell
curl http://localhost:5000/api/sensor/stats
```

**Response:**
```json
{
  "average_temperature": 28.5,
  "average_humidity": 65.2,
  "average_light": 523.7,
  "min_temperature": 25.0,
  "max_temperature": 32.0,
  "min_humidity": 55.0,
  "max_humidity": 75.0,
  "total_records": 150
}
```

#### Control Pump
```powershell
# Turn ON
curl -X POST http://localhost:5000/api/pump/control \
  -H "Content-Type: application/json" \
  -d "{\"status\":\"ON\"}"

# Turn OFF
curl -X POST http://localhost:5000/api/pump/control \
  -H "Content-Type: application/json" \
  -d "{\"status\":\"OFF\"}"
```

**Response:**
```json
{
  "message": "Pump control command sent: ON",
  "status": "success"
}
```

---

## 🔌 Hardware Components

### Pin Configuration (ESP32)
| Component  | ESP32 Pin | Description          |
|------------|-----------|----------------------|
| DHT11 DATA | GPIO 25   | Temperature/Humidity |
| LDR        | GPIO 34   | Light sensor (ADC)   |
| Relay IN   | GPIO 14   | Pump control         |

### Wiring Diagram
See `ESP32/diagram.json` for complete Wokwi circuit diagram.

---

## 🌐 API Endpoints

| Method | Endpoint              | Description                |
|--------|-----------------------|----------------------------|
| GET    | `/api/sensor/latest`  | Get latest sensor reading  |
| GET    | `/api/sensor/history` | Get historical data        |
| GET    | `/api/sensor/stats`   | Get analytics (avg/min/max)|
| POST   | `/api/pump/control`   | Control pump (ON/OFF)      |

**Example Request:**
```bash
curl -X POST http://localhost:5000/api/pump/control \
  -H "Content-Type: application/json" \
  -d '{"status": "ON"}'
```

---

## 📡 MQTT Topics

| Topic            | Direction      | Payload Format          |
|------------------|----------------|-------------------------|
| `iot/uas/sensor` | ESP32 → Server | `{"temperature":25.5,"humidity":60,"light":512}` |
| `iot/uas/pompa`  | Server → ESP32 | `ON` or `OFF`           |

---

## 🐛 TROUBLESHOOTING & SOLUSI

### ❌ ESP32 Issues

#### Problem 1: Error Upload - `upload_port` not specified
```
Error: Please specify `upload_port` for environment
```

**Solusi:**
```powershell
# Cek port COM yang tersedia
pio device list

# Upload dengan spesifikasi port (ganti COM3 sesuai hasil)
pio run --target upload --upload-port COM3
```

#### Problem 2: WiFi tidak bisa connect
```
Connecting to WiFi...
................
(stuck di titik-titik)
```

**Solusi:**
1. **Cek SSID dan Password** - Pastikan benar di `main.cpp`
2. **WiFi 2.4GHz** - ESP32 tidak support 5GHz, gunakan 2.4GHz only
3. **Jarak Router** - Pastikan ESP32 dekat dengan router
4. **Serial Monitor** - Lihat error message lengkap:
```powershell
pio device monitor --port COM3
```

#### Problem 3: MQTT Connection Failed (rc=-2)
```
Attempting MQTT Connection...Failed, rc=-2 retry in 5s
```

**Penyebab:** DNS Failed / broker tidak bisa diakses

**Solusi:**

**Untuk Simulasi Wokwi:**
```cpp
// Gunakan broker public HiveMQ
const char* mqtt_server = "broker.hivemq.com"; 
const int mqtt_port = 1883;
```

**Untuk ESP32 Hardware dengan Ngrok:**
1. Pastikan Mosquitto running: `mosquitto -v`
2. Pastikan Ngrok tunnel aktif: `ngrok tcp 1883`
3. Copy URL dan port dari ngrok ke code
4. Rebuild dan upload ulang firmware

**Test koneksi MQTT:**
```powershell
# Install MQTT client
npm install -g mqtt

# Subscribe test
mqtt subscribe -h broker.hivemq.com -t "iot/uas/sensor"

# Publish test
mqtt publish -h broker.hivemq.com -t "iot/uas/pompa" -m "ON"
```

#### Problem 4: Sensor DHT11 Return NaN
```
Failed to read DHT!
```

**Solusi:**
1. **Cek Wiring** - Pastikan pin DHT11 benar (Data ke GPIO 25)
2. **Power Supply** - DHT11 butuh 3.3V atau 5V stable
3. **Pull-up Resistor** - Gunakan resistor 10kΩ antara Data dan VCC (optional, tapi recommended)
4. **Delay** - Tambah delay sebelum baca sensor:
```cpp
void setup() {
  // ...
  dht.begin();
  delay(2000);  // Tunggu sensor ready
}
```

---

### ❌ Database Issues

#### Problem 1: Cannot connect to MySQL
```
Error: ER_ACCESS_DENIED_ERROR
```

**Solusi:**
1. Cek file `.env` di folder backend
2. Pastikan username dan password MySQL benar
3. Test koneksi manual:
```powershell
mysql -u root -p
# Jika berhasil login, berarti credentials benar
```

4. Cek MySQL service running:
```powershell
# Windows
net start MySQL80

# Atau cek di Services (Win+R → services.msc)
```

#### Problem 2: Database/Table tidak ada
```
Error: ER_NO_SUCH_TABLE: Table 'iot_monitoring.sensor_data' doesn't exist
```

**Solusi:**
```sql
-- Login ke MySQL
mysql -u root -p

-- Buat database jika belum ada
CREATE DATABASE IF NOT EXISTS iot_monitoring;

-- Gunakan database
USE iot_monitoring;

-- Buat table
CREATE TABLE sensor_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  temperature FLOAT NOT NULL,
  humidity FLOAT NOT NULL,
  light INT NOT NULL,
  timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_timestamp (timestamp)
);

-- Verifikasi
SHOW TABLES;
DESCRIBE sensor_data;
```

---

### ❌ Backend Issues

#### Problem 1: Port 5000 sudah digunakan
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Solusi:**
```powershell
# Windows: Kill process di port 5000
netstat -ano | findstr :5000
taskkill /PID <PID_NUMBER> /F

# Atau ganti port di .env
PORT=5001
```

#### Problem 2: MQTT broker tidak connect di backend
```
Error: connect ECONNREFUSED
```

**Solusi:**
1. Cek MQTT broker running (Mosquitto atau HiveMQ)
2. Cek konfigurasi di `.env`:
```env
MQTT_BROKER=broker.hivemq.com
MQTT_PORT=1883
```
3. Test MQTT broker:
```powershell
# Ping broker
ping broker.hivemq.com

# Test subscribe
mqtt subscribe -h broker.hivemq.com -t "test"
```

#### Problem 3: CORS Error di Browser
```
Access to XMLHttpRequest blocked by CORS policy
```

**Solusi:**
Pastikan backend sudah enable CORS di `server.js`:
```javascript
const cors = require('cors');
app.use(cors());
```

---

### ❌ Frontend Issues

#### Problem 1: Cannot GET API
```
Error: Network Error / ERR_CONNECTION_REFUSED
```

**Solusi:**
1. Pastikan backend running di `http://localhost:5000`
2. Cek API base URL di config frontend
3. Test API manual di browser:
```
http://localhost:5000/api/sensor/latest
```

#### Problem 2: Data tidak muncul di dashboard
```
Dashboard kosong / No data available
```

**Solusi:**
1. **Cek ESP32** - Pastikan publish data (lihat serial monitor)
2. **Cek Backend** - Lihat log "Message received on iot/uas/sensor"
3. **Cek Database** - Query manual:
```sql
SELECT * FROM sensor_data ORDER BY timestamp DESC LIMIT 5;
```
4. **Cek Browser Console** (F12) - Lihat error messages
5. **Clear Cache** - Hard refresh dengan Ctrl+Shift+R

#### Problem 3: Chart tidak muncul
```
Recharts warning / Chart not rendering
```

**Solusi:**
1. Install ulang dependencies:
```powershell
cd Website/frontend
rm -rf node_modules
npm install
```
2. Restart React dev server:
```powershell
npm start
```

---

### ❌ Wokwi Simulation Issues

#### Problem 1: Firmware not loading
```
Error: Could not load firmware
```

**Solusi:**
1. Cek file `wokwi.toml` - Pastikan path benar:
```toml
firmware = '.pio/build/esp32dev/firmware.bin'
elf = '.pio/build/esp32dev/firmware.elf'
```
2. Build ulang firmware:
```powershell
pio run
```
3. Cek file `.bin` dan `.elf` ada di `.pio/build/esp32dev/`

#### Problem 2: Wokwi tidak bisa akses ngrok
```
DNS Failed for 0.tcp.ap.ngrok.io
```

**Solusi:**
⚠️ **Wokwi VS Code extension tidak bisa akses internet**

- Untuk Wokwi VS Code: **Gunakan broker public** (broker.hivemq.com)
- Untuk Wokwi Web: **Bisa akses ngrok** (upload project ke wokwi.com)

```cpp
// Config untuk Wokwi VS Code
const char* mqtt_server = "broker.hivemq.com"; 
const int mqtt_port = 1883;
```

---

### 📞 Support & Help

Jika masih ada masalah setelah ikuti troubleshooting di atas:

1. **Cek Serial Monitor** - 90% masalah terlihat di sini
2. **Cek Backend Logs** - Error message biasanya jelas
3. **Cek Browser Console** - Frontend errors ada di sini
4. **Query Database Manual** - Pastikan data masuk
5. **Test Komponen Terpisah** - Test ESP32, Backend, Frontend satu-satu

**Tips Debug:**
```powershell
# ESP32: Monitor serial dengan filter
pio device monitor --port COM3 --filter esp32_exception_decoder

# Backend: Run dengan verbose
DEBUG=* npm start

# Frontend: Check network tab (F12 → Network)
```

---

## 📝 Assignment Requirements (UTS)

✅ **Nomor 1a-1c:** Backend menghasilkan JSON sesuai format yang diminta  
✅ **Nomor 2a:** Parsing JSON di aplikasi dan menampilkan di UI  
✅ **Nomor 2b:** Perhitungan analitik (rata-rata, min, max, jumlah data)  
✅ **Video Demo:** Link ada di PDF jawaban  
✅ **GitHub Repository:** [Link will be added to PDF]  

---

## ✅ CHECKLIST REQUIREMENT UTS

### A) ESP32 Simulation (Wokwi Website) ✅
- [x] Simulasi ESP32 di **Wokwi Website** (https://wokwi.com/projects/446768718203273217)
- [x] Membaca sensor DHT11 (suhu & kelembaban)
- [x] Membaca sensor LDR (intensitas cahaya)
- [x] Koneksi WiFi ke Wokwi-GUEST (internet access)
- [x] MQTT Client untuk publish dan subscribe
- [x] **Connect ke MQTT via Ngrok** (0.tcp.ap.ngrok.io)
- [x] Format data JSON dengan ArduinoJson library
- [x] Publish data setiap 5 detik ke topic `iot/uas/sensor`
- [x] Subscribe topic `iot/uas/pompa` untuk kontrol
- [x] Kontrol relay untuk pompa ON/OFF
- [x] Serial monitoring di Wokwi console

### B) Backend Server ✅
- [x] **Nomor 1a**: Script backend generate JSON format yang benar
- [x] **Nomor 1b**: JSON valid (test di jsoneditoronline.org)
- [x] **Nomor 1c**: Parser JSON berfungsi dengan baik
- [x] MQTT subscriber menerima data dari ESP32
- [x] Simpan data ke MySQL database
- [x] REST API endpoints lengkap
- [x] MQTT publisher untuk kontrol perangkat
- [x] Error handling dan logging

### C) Frontend Dashboard ✅
- [x] **Nomor 2a**: Parsing JSON dan tampilkan di UI
- [x] **Nomor 2b**: Analitik (rata-rata, min, max, total)
- [x] Real-time data display
- [x] Charts untuk visualisasi
- [x] Pump control panel
- [x] Responsive design

### D) Tools & Testing ✅
- [x] **Mosquitto**: Local MQTT broker (localhost:1883)
- [x] **Ngrok**: Port forwarding untuk akses internet (tcp tunnel)
- [x] **MQTTBox**: GUI tool untuk monitor dan test MQTT
- [x] **Wokwi Website**: Online ESP32 simulator dengan internet access

### E) Dokumentasi ✅
- [x] **Video Demo**: Link di PDF jawaban (menunjukkan Wokwi + Ngrok + MQTTBox)
- [x] **GitHub Repository**: Code lengkap dengan link di PDF
- [x] **README.md**: Dokumentasi lengkap dengan:
  - Setup Wokwi Website + Ngrok workflow
  - MQTTBox testing guide
  - Arsitektur diagram dengan port forwarding
  - Troubleshooting Wokwi + Ngrok issues
- [x] **.gitignore**: Ignore ngrok.exe dan Dpcy/
- [x] **Folder ESP32**: Referensi code untuk simulasi (tidak untuk upload hardware)

---

## 📝 CATATAN PENTING

### 🌐 Mengapa Wokwi Website + Ngrok?

**Keuntungan Setup Ini:**

✅ **Wokwi Website:**
- Akses internet penuh (bisa connect ke ngrok)
- Tidak perlu hardware ESP32 fisik
- Simulator stabil dan reliable
- Bisa share link project untuk review

✅ **Ngrok Port Forwarding:**
- Local MQTT broker (Mosquitto) bisa diakses dari internet
- Backend tetap berjalan di localhost (aman)
- Database MySQL tetap lokal (tidak perlu cloud database)
- Bisa test real-world scenario tanpa deploy backend

✅ **MQTTBox:**
- Visual monitoring MQTT messages
- Easy testing tanpa code
- Debug connection issues dengan mudah
- Save messages untuk documentation

**vs Alternative:**

❌ **Wokwi VS Code Extension:**
- Tidak bisa akses internet (DNS failed untuk ngrok)
- Hanya bisa connect ke public broker (broker.hivemq.com)
- Tidak bisa test dengan backend lokal

❌ **ESP32 Hardware:**
- Perlu beli hardware (DHT11, LDR, Relay, ESP32)
- Setup wiring memakan waktu
- Debugging lebih susah (perlu serial monitor hardware)

### 🔒 Security Notes

⚠️ **Untuk Production:**
- Ngrok free tier: URL berubah setiap restart (tidak persistent)
- Gunakan paid ngrok untuk fixed URL
- Enable authentication di Mosquitto
- Gunakan SSL/TLS untuk MQTT (mqtts://)
- Don't commit ngrok authtoken ke Git

### 📁 Folder ESP32 - Untuk Referensi Saja

Folder `ESP32/` di repository ini berisi:
- ✅ Source code (`src/main.cpp`) - untuk di-copy ke Wokwi
- ✅ PlatformIO config (`platformio.ini`) - reference library deps
- ✅ Wokwi files (`diagram.json`, `wokwi.toml`) - circuit reference
- ❌ **TIDAK** untuk build/upload hardware
- ✅ **HANYA** untuk simulasi Wokwi Website

**Cara Pakai:**
1. Copy `src/main.cpp` ke Wokwi code editor
2. Update ngrok URL di code
3. Copy `diagram.json` jika ingin circuit yang sama
4. Jalankan simulasi di Wokwi Website

---

## 📄 LISENSI

```
MIT License

Copyright (c) 2025 [ Fathurrahman Pratama Putra ]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👨‍💻 TENTANG DEVELOPER

<div align="center">

### Fathurrahman Pratama Putra

**NIM:** 152023057  
**Program Studi:** Informatika  
**Institut:** Institut Teknologi Nasional Bandung

**Kontak:**
- 📧 Email: fathurrahman.pratama@itenas.ac.id
- 💼 LinkedIn: [Fathurrahman Pratama Putra](https://www.linkedin.com/in/fathurp01)
- 🐙 GitHub: [@fathurp01](https://github.com/fathurp01)

</div>

---

## 🙏 ACKNOWLEDGMENTS

Terima kasih kepada:
- **Galih Ashari R., S.Si., MT** - Dosen Pengampu Mata Kuliah Pemrograman IoT
- **PlatformIO Team** - Platform development ESP32 yang powerful
- **Node.js & Express Community** - Backend framework yang solid
- **React Team** - Frontend library yang modern dan efisien
- **HiveMQ** - Public MQTT broker untuk testing
- **Wokwi** - ESP32 simulator yang memudahkan development
- **Stack Overflow Community** - Solusi untuk berbagai problem
- **Teman-teman Kelas** - Diskusi dan saling membantu dalam belajar
- **GitHub** - Platform untuk version control dan collaboration

---

## 📝 REFERENSI

### Official Documentation
- [ESP32 Arduino Core](https://docs.espressif.com/projects/arduino-esp32/)
- [PlatformIO Documentation](https://docs.platformio.org/)
- [MQTT Protocol](https://mqtt.org/mqtt-specification/)
- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [React Documentation](https://react.dev/)
- [MySQL Documentation](https://dev.mysql.com/doc/)

### Libraries Used
- [PubSubClient](https://pubsubclient.knolleary.net/) - MQTT Client for ESP32
- [ArduinoJson](https://arduinojson.org/) - JSON library for Arduino
- [DHT Sensor Library](https://github.com/adafruit/DHT-sensor-library) - Adafruit DHT
- [MQTT.js](https://github.com/mqttjs/MQTT.js) - MQTT client for Node.js
- [MySQL2](https://github.com/sidorares/node-mysql2) - MySQL client for Node.js
- [Material-UI](https://mui.com/) - React UI framework

---

<div align="center">

### ⭐ TERIMA KASIH ⭐

**Dibuat dengan ❤️ untuk UTS Pemrograman IoT**

**Sistem IoT Monitoring & Control - 2025**

© 2025 Fathurrahman Pratama Putra. All Rights Reserved.

---

📌 **Note:** Project ini dibuat untuk tujuan edukasi (UTS Pemrograman IoT).  
Feel free to use and modify untuk keperluan pembelajaran.

[🔝 Kembali ke Atas](#-sistem-monitoring--kontrol-iot---uts-pemrograman-iot)

</div>


## 🙏 Acknowledgments

- PlatformIO for ESP32 development tools
- Wokwi for online ESP32 simulation
- HiveMQ for public MQTT broker
- Ngrok for tunneling local MQTT broker

---

**📌 Note:** Untuk dokumentasi lengkap website (API details, database schema, deployment), lihat [Website/README.md](Website/README.md)
