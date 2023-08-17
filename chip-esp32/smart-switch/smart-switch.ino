#include <Servo_ESP32.h>
#include <WiFi.h>
#include <ESPAsyncWebSrv.h>

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
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }

  Serial.println("Connected to WiFi");
  // Serial.print("IP address: ");
  // Serial.println(WiFi.localIP());
  myServo.attach(servoPin);
  myServo.write(0);

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

void loop() {
    if (client.connect(serverUrl, 3000)) {
        client.print("GET /heartbeat?ip=");
        client.print(WiFi.localIP()); // Include ESP32's IP address in the query parameter
        client.println(" HTTP/1.1");
        client.println("Host: example.com"); // Replace with your server's hostname
        client.println("Connection: close");
        client.println();
        while (client.connected()) {
            if (client.available()) {
                Serial.write(client.read());
            }
        }
        client.stop();
    } else {
        Serial.println("Connection failed");
    }

    delay(10000); // Send heartbeat every 10 seconds
}
