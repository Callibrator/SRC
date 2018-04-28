SIGNALS = {}

connection = Object()
isConnected = false;

function sendSignal(signal){
  if(isConnected){
    connection.send(signal)
  }
}

function onMessage(msg){
  console.log(msg)
  html = $("#terminal").html()
  $("#terminal").html(html + msg.data)

}


function keyDownEvent(e){

  if(SIGNALS["keys"]){
    Object.keys(SIGNALS["keys"]).forEach(function(key,index){

      if(e.key == key){
       sendSignal(SIGNALS["keys"][key])
      }



    })
  }
}

function mouseMoveEvent(e){
  if(!SIGNALS["mouse"])
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
window.addEventListener('mousemove',mouseMoveEvent)
