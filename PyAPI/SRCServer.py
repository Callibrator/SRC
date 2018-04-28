import json
import os
import threading
import datetime
from queue import Queue
import time

import http.server
import socketserver
import serial

from geventwebsocket import WebSocketServer, WebSocketApplication, Resource
from collections import OrderedDict

Signals = Queue()
Terminal = Queue()

class EchoApplication(WebSocketApplication):
	def __init__(self,ws):
		self.protocol = self.protocol_class(self)
		self.ws = ws
		
		self.terminalBroadcastThread = threading.Thread(target=self.broadcastTerminal)
		self.terminalBroadcastThread.start()
	def broadcastTerminal(self):
		global Terminal
		while 1:
			msg = Terminal.get()
			for client in self.ws.handler.server.clients.values():
				client.ws.send(msg)		
	def on_open(self):
		print("[!]Connection opened")
	
	def on_close(self,reason):
		print("[!]Connection Closed")
	
	def on_message(self,message):
		global Signals
		if message != None and message != "":
			Signals.put(message)

class SRCServer:
	def __init__(self):
		print("[+]Server Initialization Started")
		self.options = json.loads(open('server.config','r').read())
		
		robot = serial.Serial(self.options["robot_port"],self.options["bandwidth"])
		
		
		self.root_dir = os.getcwd()
		if self.options["enable_web_server"] != "False":
			self.HTTPServerThread = threading.Thread(target=self.start_web_server)
			self.HTTPServerThread.start()
		
		self.signalsServiceThread = threading.Thread(target=self.signals_service,args=(robot,))
		self.signalsServiceThread.start()	
		
		self.serialReceverThread = threading.Thread(target=self.serialRecever,args=(robot,))
		self.serialReceverThread.start()	
		
		self.start_service()
	def serialRecever(self,robot):
		
		temp_str = ""
		while 1:
			data = robot.read(1).decode()
			temp_str += data
			if data == "\n":
				print(temp_str)
				Terminal.put(temp_str)
				temp_str = ""
			
	def signals_service(self,serial):
		global Signals
		while 1:
			signal = Signals.get() +"|"
			serial.write(signal.encode("utf-8"))
			
	def start_web_server(self):
		PORT = self.options["web_port"]
		Handler = http.server.SimpleHTTPRequestHandler
		os.chdir(os.getcwd()+os.sep+"WebServer")
		with socketserver.TCPServer(("", PORT), Handler) as httpd:
			print("[+] Web Server Started At Port", PORT)
			httpd.serve_forever()
				
	def start_service(self):
		port = self.options["service_port"]
		ip = self.options["service_ip"]
		print("[+]Service Started")
		WebSocketServer((ip,port),Resource(OrderedDict([('/',EchoApplication)]))).serve_forever()

		
		self.HTTPServerThread.stop()	
		
if __name__ == "__main__":
	server = SRCServer()
	input()
