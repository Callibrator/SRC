
char str[512];
char incomingByte;
int i;

int timer = 0;
int pwm_value = 0;

int led = 3;

void dec_pwm(){

  pwm_value -= 5;
  if(pwm_value < 0){
    pwm_value = 0;
    Serial.println("<p style=\"color:red\">Led Reached Lowest Value.</p>");
  }else{
    Serial.print("<p style=\"color:green\">Led Value: ");
    Serial.print(pwm_value);
    Serial.println("</p>");
  }
  analogWrite(led,pwm_value);

}

void inc_pwm(){
  pwm_value += 5;
  if(pwm_value > 255){
    pwm_value = 255;
    Serial.println("<p style=\"color:red\">Led Reached Maximum Value.</p>");
  }else{
    Serial.print("<p style=\"color:green\">Led Value: ");
    Serial.print(pwm_value);
    Serial.println("</p>");
  }
 analogWrite(led,pwm_value);

}

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  pinMode(led,OUTPUT);
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

      if(strcmp(str,"forward") == 0){
        //Serial.println("<div>Increasing led value</div>");
        inc_pwm();
      }

      if(strcmp(str,"backward") == 0){
        dec_pwm();
      }
      
    }
    
  }

 

        
      
      
      
  
  
 
}

