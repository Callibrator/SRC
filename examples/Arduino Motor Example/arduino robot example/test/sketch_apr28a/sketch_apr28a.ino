#include "AFMotor.h"

char str[512];
char incomingByte;
int i;

AF_DCMotor motor1(1);
AF_DCMotor motor2(2);
AF_DCMotor motor3(3);
AF_DCMotor motor4(4);

int DelayTime = 50;

void stopMotor1(){
  delay(DelayTime);
  motor1.run(RELEASE);
}

void stopMotor2(){
  delay(DelayTime);
  motor2.run(RELEASE);
}

void stopMotor3(){
  delay(DelayTime);
  motor3.run(RELEASE);
}

void stopMotor4(){
  delay(DelayTime);
  motor4.run(RELEASE);
}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  motor1.setSpeed(200);
  motor2.setSpeed(200);
  motor3.setSpeed(200);
  motor4.setSpeed(200);

  motor1.run(RELEASE);
  motor2.run(RELEASE);
  motor3.run(RELEASE);
  motor4.run(RELEASE);

  Serial.println("<p style=\"color:red;\"> Welcome... You can control the roboto now :*)</p>");

}

void loop() {
  // put your main code here, to run repeatedly:

 
  while (Serial.available() > 0){
    incomingByte = Serial.read();
    str[i] = incomingByte;
    i++;
    if(incomingByte == '|'){
      str[i-1] = '\0';
      //Serial.print("You Sent: ");
      //Serial.println(str);
      i = 0;

      if(strcmp(str,"right") == 0){
        //Serial.println("<div>Increasing led value</div>");
        motor1.run(FORWARD);
        stopMotor1();
      }

      if(strcmp(str,"left") == 0){
        motor1.run(BACKWARD);
        stopMotor1();
      }

      if(strcmp(str,"forward") == 0){
        //Serial.println("<div>Increasing led value</div>");
        motor2.run(FORWARD);
        stopMotor2();
      }

      if(strcmp(str,"backward") == 0){
        motor2.run(BACKWARD);
        stopMotor2();
      }

      
      if(strcmp(str,"forward2") == 0){
        //Serial.println("<div>Increasing led value</div>");
        motor3.run(FORWARD);
        stopMotor3();
      }

      if(strcmp(str,"backward2") == 0){
        motor3.run(BACKWARD);
        stopMotor3();
      }

      if(strcmp(str,"forward3") == 0){
        //Serial.println("<div>Increasing led value</div>");
        motor4.run(FORWARD);
        stopMotor4();
      }

      if(strcmp(str,"backward3") == 0){
        motor4.run(BACKWARD);
        stopMotor4();
      }

      
    }
    
  }

 

        
      
      
      
  
  
 
}

