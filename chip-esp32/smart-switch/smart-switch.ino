#include <Servo_ESP32.h>
#include <WiFi.h>
#include <ArduinoJson.h> // Include the ArduinoJson library
#include <ESPAsyncWebSrv.h> // Include the modified ESPAsyncWebServer library

static const int servoPin = 14;  //printed G14 on the board
const char* serverUrl = "http://localhost:3000/heartbeat"; // Replace with your server URL

Servo_ESP32 myServo;
WiFiClient client;

const char* ssid = "Bananenkarton";
const char* password = "88542283243511630573";
bool switched = false;

AsyncWebServer server(80);

void setup() {
  Serial.begin(115200);
  connect_to_wifi(ssid, password);

  myServo.attach(servoPin);
  myServo.write(0);

  server.on("/setAngle", HTTP_GET, [](AsyncWebServerRequest* request) {
    if (request->hasParam("switch")) {
      int mySwitch = request->getParam("switch")->value().toInt();
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

bool connect_to_wifi(const char* ssid, const char* password) {
  if (ssid && password && strlen(ssid) > 0 && strlen(password) > 0) {
    WiFi.begin(ssid, password);
    int timeout = 10;
    while (WiFi.status() != WL_CONNECTED && timeout > 0) {
      delay(1000);
      Serial.println("Connecting to WiFi...");
      timeout--;
    }

    if (WiFi.status() == WL_CONNECTED) {
      Serial.println("Connected to WiFi");
      return true;
    } else {
      Serial.println("Failed to connect to WiFi");
      return false;
    }
  }
  return false;
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
