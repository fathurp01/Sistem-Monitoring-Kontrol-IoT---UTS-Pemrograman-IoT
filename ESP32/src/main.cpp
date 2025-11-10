#include <Arduino.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include "DHT.h"
#include <ArduinoJson.h>

// ------------------- CONFIG -------------------
#define DHTPIN 25
#define DHTTYPE DHT11
#define LDR_PIN 34
#define RELAY_PIN 14

// WiFi
const char* ssid = "Wokwi-GUEST";  
const char* password = "";

// MQTT Broker (Test Public)
const char* mqtt_server = "broker.hivemq.com"; 
const int mqtt_port = 1883;

// MQTT Broker (Local Mosquitto via Ngrok)
// const char* mqtt_server = "0.tcp.ap.ngrok.io";
// const int mqtt_port = 14066;

// Local MQTT Broker
// const char* mqtt_server = "localhost";
// const int mqtt_port = 1883;

// MQTT Topics
const char* pubTopic = "iot/uas/sensor";
const char* subTopic = "iot/uas/pompa";

// Objects
WiFiClient espClient;
PubSubClient client(espClient);
DHT dht(DHTPIN, DHTTYPE);

unsigned long lastMsg = 0;
int interval = 5000; // kirim data setiap 5 detik

// ------------------- POMPA CONTROL -------------------
// void controlPompa(String status) {
//   if (status == "ON") {
//     digitalWrite(RELAY_PIN, HIGH);  
//     Serial.println("Pompa: ON");
//   } else {
//     digitalWrite(RELAY_PIN, LOW);
//     Serial.println("Pompa: OFF");
//   }
// }

void controlPompa(String status) {
  status.trim();           // hapus spasi di depan/akhir
  status.replace("\"",""); // hapus tanda kutip jika ada

  if (status.equalsIgnoreCase("ON")) {
    digitalWrite(RELAY_PIN, HIGH);  
    Serial.println("Pompa: ON");
  } else if (status.equalsIgnoreCase("OFF")) {
    digitalWrite(RELAY_PIN, LOW);
    Serial.println("Pompa: OFF");
  } else {
    Serial.print("Status tidak dikenali: ");
    Serial.println(status);
  }
}

// ------------------- MQTT CALLBACK -------------------
void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("MQTT Message [");
  Serial.print(topic);
  Serial.print("] : ");

  String msg = "";
  for (int i = 0; i < length; i++) msg += (char)message[i];
  Serial.println(msg);

  controlPompa(msg);
}

// ------------------- WIFI CONNECT -------------------
void setup_wifi() {
  delay(10);
  Serial.println("\nConnecting to WiFi...");
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nWiFi Connected!");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());
}

// ------------------- MQTT RECONNECT -------------------
void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT Connection...");

    String clientId = "ESP32-UAS-";
    clientId += String(random(0xffff), HEX);

    if (client.connect(clientId.c_str())) {
      Serial.println("Connected!");
      client.subscribe(subTopic);
      Serial.print("Subscribed to: ");
      Serial.println(subTopic);
    } else {
      Serial.print("Failed, rc=");
      Serial.print(client.state());
      Serial.println(" retry in 5s");
      delay(5000);
    }
  }
}

// ------------------- SETUP -------------------
void setup() {
  Serial.begin(115200);
  dht.begin();

  pinMode(RELAY_PIN, OUTPUT);
  digitalWrite(RELAY_PIN, LOW); // awal OFF

  setup_wifi();
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);
}

// ------------------- MAIN LOOP -------------------
void loop() {
  if (!client.connected()) reconnect();
  client.loop();

  unsigned long now = millis();
  if (now - lastMsg > interval) {
    lastMsg = now;

    float h = dht.readHumidity();
    float t = dht.readTemperature();
    int ldrValue = analogRead(LDR_PIN);

    if (isnan(h) || isnan(t)) {
      Serial.println("Failed to read DHT!");
      return;
    }

    // Buat JSON
    StaticJsonDocument<200> jsonDoc;
    jsonDoc["temperature"] = t;
    jsonDoc["humidity"] = h;
    jsonDoc["light"] = ldrValue;

    char buffer[200];
    size_t n = serializeJson(jsonDoc, buffer);

    client.publish(pubTopic, buffer, n);

    Serial.print("Published: ");
    Serial.println(buffer);
  }
}