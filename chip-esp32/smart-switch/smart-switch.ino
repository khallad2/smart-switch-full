#include <Servo_ESP32.h>
#include <WiFi.h>
#include <ESPAsyncWebSrv.h>

static const int servoPin = 14; //printed G14 on the board

Servo_ESP32 myServo;

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

    server.on("/setAngle", HTTP_GET, [](AsyncWebServerRequest *request){
        if (request->hasParam("switch")) {
            String value = request->getParam("switch")->value();
            int mySwitch = value.toInt();
            if(mySwitch == 1) {
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

void toggleServo(){
  int currentAngle = myServo.read();
  int newAngle = (currentAngle == 0) ? 180 : 0;
  switched = !switched;
  myServo.write(newAngle);
}

void loop() {
  
}