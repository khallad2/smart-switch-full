#include <Servo_ESP32.h>
#include <WiFi.h>
#include <WiFiManager.h>  // Add WiFiManager library
#include <ArduinoJson.h>
#include <ESPAsyncWebSrv.h>

static const int servoPin = 14;
const char* serverUrl = "http://localhost:3000/heartbeat";

Servo_ESP32 myServo;
WiFiClient client;

bool switched = false;

AsyncWebServer server(9090);

void setup() {
  Serial.begin(115200);
  WiFi.mode(WIFI_STA); // explicitly set mode, esp defaults to STA+AP

  // WiFiManager Configuration
  WiFiManager wm;
  wm.resetSettings();
  
  bool res = wm.autoConnect("Smart-Switch", "password-switch");  // Change to desired Smart-Switch name and password
  if(!res) {
      Serial.println("Failed to connect");
        // ESP.restart();
  }

  WiFi.begin(wm.getWiFiSSID().c_str(), wm.getWiFiPass().c_str());
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

  //if you get here you have connected to the WiFi    
  Serial.println("connected...yeey :)");

  myServo.attach(servoPin);
  myServo.write(1);
  myServo.write(0);


  // API Requests Setup
  server.on("/setAngle", HTTP_GET, [](AsyncWebServerRequest* request) {
    if (request->hasParam("switch")) {
      String value = request->getParam("switch")->value();
      int mySwitch = value.toInt();
      if (mySwitch == 1) {
        toggleServo();
      } else {
        request->send(400, "application/json", "{\"message\":\"Invalid switch parameter\"}");
      }
      String response = "{\"message\":\"" + String(switched ? "On" : "Off") + "\"}";
      request->send(200, "application/json", response);
    } else {
      request->send(400, "application/json", "{\"message\":\"Missing switch parameter\"}");
    }
  });

  server.begin();
}

void toggleServo() {
  int currentAngle = myServo.read();
  int newAngle = (currentAngle == 0) ? 180 : 0;
  switched = !switched;
  myServo.write(newAngle);
}

// void heartbeat() {
//   asyncClient.onConnect([](void* obj, AsyncClient* asyncClient) {
//     Serial.println("Connected to server");
//     String request = "GET /heartbeat?ip=" + WiFi.localIP().toString() + " HTTP/1.1\r\n"
//                     "Host: example.com\r\n"
//                     "Connection: close\r\n\r\n";
//     asyncClient->add(request.c_str(), request.length());
//   }, NULL);

//   asyncClient.onError([](void* obj, AsyncClient* asyncClient, int8_t error) {
//     Serial.println("Connection error");
//     asyncClient->close();
//   }, NULL);

//   asyncClient.onDisconnect([](void* obj, AsyncClient* asyncClient) {
//     Serial.println("Disconnected from server");
//     asyncClient->close();
//   }, NULL);

//   asyncClient.connect("example.com", 80);
// }


void loop() {
  // if (WiFi.status() == WL_CONNECTED) {
  //   heartbeat();
  // }
  // delay(10000); // Send heartbeat every 10 seconds
}

