//sets pins for XAccel, YAccel, and ZAccel
int pinX = 0;
int pinY = 1;
int pinZ = 2;
int baudRate = 57600;

void setup() {
  //setup code, to run once:
  //opens serial connection with 57600 baudrate; must match chrome.serial baudrate
  Serial.begin(57600);
  //delays 3 secs
  delay(3000);
  //prints header line
  Serial.println("Time,XAccel,YAccel,ZAccel");
}

void loop() {
  //main code, to run repeatedly:
  //reads raw data for each direction from the pin defined at the top of the file
  int rawX = analogRead(pinX);
  int rawY = analogRead(pinY);
  int rawZ = analogRead(pinZ);
  //sets time in milliseconds since code began
  unsigned long time = millis() - 3000;
  
  //prints time and accelerations to the serial port in a comma separated format
  Serial.print(time); Serial.print(",");
      Serial.print(rawX); Serial.print(",");
      Serial.print(rawY); Serial.print(",");
      Serial.print(rawZ); Serial.println("");
  
  //delays 0.005 sec before next reading
  delay(5);
}
