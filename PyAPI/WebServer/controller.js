


class Connect extends React.Component{
  constructor(props){
    super(props)
    this.state = {connected:false}
  }
  connect(e){
    if(this.state.connected == false){
      let ip = $('#ip').val().trim()
      let port = parseInt($('#port').val().trim())

      if(!ip || ip == ""){
        $("#app_info_div").text("Ip can not be empty")
        return;
      }

      if(!port || port == ""){
        $("#app_info_div").text("Port can not be empty")
        return;
      }

      if(typeof port != "number")
      {
        $("#app_info_div").text("Port mustbe a number")
        return;
      }

      $("#app_info_div").text("")
      $("#terminal").html("")
      connection = new WebSocket('ws://'.concat(ip,':',port));
      connection.onopen = () => {
        isConnected = true;
        this.setState({connected:true})
      }

      connection.onerror = () =>{
		isConnected = false;
        this.setState({connected:false})
		$("#app_info_div").text("Unable to communicate with the server, Check your ip and port")
	  }
      connection.onmessage  = onMessage

    }else{
      connection.close()
      this.setState({connected:false})
    }



  }
  load_user_configuration(){

    let config_str = $("#user_config_data").val().trim()
    let config = JSON.parse(config_str)


    SIGNALS = config;

  }
  clear_terminal(){
      $("#terminal").html("")
  }
  render(){
    return(
      <div>
        <label for="ip">IP: </label>
        <input type="text" className="connect_inputs" ref="ip" id="ip" placeholder="127.0.0.1" disabled={this.state.connected} />
        <br />
        <label for="port">Port: </label>
        <input type="number" className="connect_inputs" ref="port" id="port" placeholder="2000" disabled={this.state.connected}/>
        <br />

        <input type="button" className="connect_buttons" onClick={this.connect.bind(this)} value={(this.state.connected==false)?"Connect":"Disconnect"} />
        <p>JSON Configuration Data</p>
        <EnableMouseCheckBox />
        <textArea id="user_config_data">
        {

'{ \n \
	"keys": { \n \
		"w": "forward", \n \
		"s": "backward", \n \
		"d": "left", \n \
		"a": "right" \n \
	}, \n \
	"mouse": { \n \
		"up": "forward", \n \
		"down": "backward", \n \
		"left": "left", \n \
		"right": "right" \n \
	} \n \
}'

        }
        </textArea>
        <input type="button" className="connect_buttons" value="Load Config File" onClick={this.load_user_configuration.bind(this)}/>
        <input type="button" className="connect_buttons" value="Clear Terminal" onClick={this.clear_terminal.bind(this)}/>
      </div>

    )
  }
}

class EnableMouseCheckBox extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      enabled:false
    }

    this.mouseTracker = this.mouseTracker.bind(this)

  }

  mouseTracker(){
    this.setState({
      enabled:EnableMouse
    })

  }

  componentDidMount(){
    this.mouseTrackerInterval = setInterval(this.mouseTracker,100)
  }

  componentWillUnmount(){
    clearInterval(this.mouseTrackerInterval)
  }

  switchState(e){

    EnableMouse = e.target.checked
  }

  render(){
    return <label><input type="checkbox" checked={this.state.enabled} onChange={this.switchState.bind(this)} /> <span className="small_note">Enable Mouse (F9)</span></label>
  }

}


class App extends React.Component{
    render(){
      return (
        <div className="app_div">
            <h1>Simple Robot Controller</h1>
            <br />
          <div className="left_div">
            <div className="connect_box">
              <Connect />
            </div>
            <div className="line_breaker"> </div>
            <div>
              <center>Application Info</center>
            </div>
            <div id="app_info_div">
            </div>
          </div>
          <div className="right_div">
            Terminal:
            <div id="terminal">
            </div>
          </div>

        </div>




      )
    }
}
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
