int scale = 200;
boolean is5V = true; //if the microcontroller is 5V
//boolean is5V = false; //if the microcontroller is 3.3V
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
  Serial.println("Time,XAccel,YAccel,ZAccel,Resultant");
}

void loop() {
  //main code, to run repeatedly:
  //reads raw data for each direction from the pin defined at the top of the file
  int rawX = analogRead(pinX);
  int rawY = analogRead(pinY);
  int rawZ = analogRead(pinZ);
  //sets time in milliseconds since code began
  unsigned long time = millis() - 3000;
  float scaledX, scaledY, scaledZ, resultant;
  
  //maps the raw data to the range for the accelerometer (units: g (9.81 m/s/s))
  if(is5V) {
      scaledX = mapf(rawX, 0, 3.3/5*1023, -scale, scale);
      scaledY = mapf(rawY, 0, 3.3/5*1023, -scale, scale);
      scaledZ = mapf(rawZ, 0, 3.3/5*1023, -scale, scale);
    } else {
      scaledX = mapf(rawX, 0, 1023, -scale, scale);
      scaledY = mapf(rawY, 0, 1023, -scale, scale);
      scaledZ = mapf(rawZ, 0, 1023, -scale, scale);
    }
      
  //calculates resultant acceleration
  resultant = sqrt(sq(scaledX) + sq(scaledY) + sq(scaledZ));
  
  //prints time and accelerations to the serial port in a comma separated format
  Serial.print(time); Serial.print(",");
      Serial.print(scaledX); Serial.print(",");
      Serial.print(scaledY); Serial.print(",");
      Serial.print(scaledZ); Serial.print(",");
      Serial.print(resultant);Serial.println("");
  
  //delays 0.003 sec before next reading
  delay(3);
}

//function to map raw data to the range of accelerometer
float mapf(int target, float targLow, float targUp, float mapLow, float mapUp) {
  float f = target/(targUp - targLow) * (mapUp - mapLow) + mapLow;
  return f;
}
