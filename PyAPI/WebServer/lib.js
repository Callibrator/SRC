let SIGNALS = {}

let connection = Object()
let isConnected = false;
let EnableMouse = false;

function sendSignal(signal){
  if(isConnected){
    connection.send(signal)
  }
}

function enableMouseShortcut(){

  EnableMouse = !EnableMouse
}

function onMessage(msg){

  html = $("#terminal").html()
  $("#terminal").html(html + msg.data)

}


function keyDownEvent(e){

  if(e.key == "F9")
  {
    enableMouseShortcut()
    return 0
  }
  if(SIGNALS["keys"]){
    Object.keys(SIGNALS["keys"]).forEach(function(key,index){

      if(e.key == key){
       sendSignal(SIGNALS["keys"][key])
      }



    })
  }
}

function mouseMoveEvent(e){
  if(!SIGNALS["mouse"] || !EnableMouse)
    return;

  offset = 10

  if(e.movementX > offset){
    if(SIGNALS["mouse"]["right"]){
      sendSignal(SIGNALS["mouse"]["right"])
    }
  }
  if(e.movementX < -offset){
    if(SIGNALS["mouse"]["left"]){
      sendSignal(SIGNALS["mouse"]["left"])
    }
  }

  if(e.movementY > offset){
    if(SIGNALS["mouse"]["down"]){
      sendSignal(SIGNALS["mouse"]["down"])
    }
  }

  if(e.movementY < -offset){
    if(SIGNALS["mouse"]["up"]){
      sendSignal(SIGNALS["mouse"]["up"])
    }
  }
}

window.addEventListener('keydown',keyDownEvent)

if( navigator.userAgent.match(/Android/i)
 || navigator.userAgent.match(/webOS/i)
 || navigator.userAgent.match(/iPhone/i)
 || navigator.userAgent.match(/iPad/i)
 || navigator.userAgent.match(/iPod/i)
 || navigator.userAgent.match(/BlackBerry/i)
 || navigator.userAgent.match(/Windows Phone/i)
 ){
    var mc = new Hammer(window)
	mc.on("panleft panright panup pandown",function(ev){

		if(SIGNALS["mouse"]["right"] && ev.type=="panright"){
		  sendSignal(SIGNALS["mouse"]["right"])
		}

		if(SIGNALS["mouse"]["left"] && ev.type=="panleft"){
		  sendSignal(SIGNALS["mouse"]["left"])
		}

		if(SIGNALS["mouse"]["up"] && ev.type=="panup"){
		  sendSignal(SIGNALS["mouse"]["up"])
		}

		if(SIGNALS["mouse"]["down"] && ev.type=="pandown"){
		  sendSignal(SIGNALS["mouse"]["down"])
		}

	})

  }
 else {
    window.addEventListener('mousemove',mouseMoveEvent)

  }
