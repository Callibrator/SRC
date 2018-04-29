# Simple Robot Controller #

## Getting Started ##
Common text
	Just execute the PyAPI/SRCServer.py or compiled/dist/SRCServer.exe (if you are using windows) and visit 127.0.0.1 in order to view the web application.
Common text	
	You will have to put your service ip and port in the boxes at the top left corner. After that click connect and you will have connected to the server.
Common text	
	You can paste your configuration data in the text area after the button connect and then click load configuration file. This will replace the default configuration file
	with your own and it will run according to your key-message paris.
	
	
## Description ##
Common text
	SRC is a simple api/service/server that allow multiple clients to send serial signals to one device.

## Authors ##
### Callibrator callibrator21@gmail.com ###
	
## Configuration ##
### You can configure everything in the server by changing the server.config file ###
`	
	service_port: The port of the tcp server, The clients use this port to connect to your server and send signals.
	web_port: The port of your web server. The web server is optional and you can ignore using it. You can use another web server like apache.
	It is NOT required for the html-webserver files to be in the same machine or in the same network, they can be somewhere totally diferent.
	
	service_ip: The ip of your server, it can be 127.0.0.1 if you want to run the program at localhost

	enable_web_server: Set to false if you do not want to run the http server. 
	
	robot_port: This is the port of your serial device (e.g arduino) It works on windows 7/8/10 (eg comX) or debian,ubuntu linux (eg, /dev/ttyXXX)
	
	bandwidth: Your serial communication bandwith (usually 9600)
`
### The Client Configuration ###
Common text	
	The web page allows use to set a JSON object and describe what key sends what signal. For Example
	
`

	{
		"keys": {
			"w": "forward",
			"s": "backward",
			"d": "left",
			"a": "right"
		},
		"mouse": {
			"up": "forward",
			"down": "backward",
			"left": "left",
			"right": "right"
		}


	}
	
`

Common text
	in keys struct you can describe the keyboard key and what message sends each key. Taking into consideration the above example, if you press the w key you will send
	forward to your robot. Your robot will reiceve that message and execute whatever command you have told him to execute when he takes that message.
Common text	
	in mouse you can set what mouse will send. It can only take 4 key-pairs (up,down,left,right) similar to keys struct. More specifically if you move your mouse up
	you will send forward...
	
	
### The Arduino ###

Common text
	The arduino can use serial to send data to the serial display on your browser. It support HTML tags (for the colors :D). Important Keep in mind that it uses
		the new character as a seperator in order to understand when to send the message.
		for example:
		
		
`

	Serial.print("<div>");
	Serial.print(a_variable);
	Serial.println("</div>");
	
`

Common text
		will send to the servcer <div> YOUR VALUE OF THE VARIABLE </div>
		
