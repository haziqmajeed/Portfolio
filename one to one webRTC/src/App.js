import React, { Component } from 'react'
import Video from './Component/Video'
import io from 'socket.io-client';

class App extends Component {
  constructor(props){
    super(props)
    
    this.state = {
      localStream:null,
      remoteStream:null,
    }

    this.socket=null;
}

componentDidMount(){
 


  

//socket programming

  this.socket = io(
    "/rtcHaziq",
    {
      path: "/haziq",
      query: {}

  }

  )


  this.socket.on('success', ()=>{
    console.log("connected Succfully");
  })

  this.socket.on('reciever',(data)=>{
    console.log("reciever");
    this.textref.value = JSON.stringify(data)
   this.pc.setRemoteDescription(new RTCSessionDescription(data));

  })

  this.socket.on('recieverCandi', (candidate)=> {
 
    this.pc.addIceCandidate(new RTCIceCandidate(candidate))

   

  })







  //RTC connections

this.pc= new RTCPeerConnection(null);


this.pc.onicecandidate = (e) => {
  console.log("onIceCandidate")
  if (e.candidate){
    this.socket.emit('icecadidate', {id:this.socket.id,candid:e.candidate});
  }
  
}
this.pc.onaddstream=(e)=>{
  console.log("remote stream:",e.stream);
this.setState({
  remoteStream:e.stream
})
}






  const success = (stream) => {
    this.pc.addStream(stream);
    this.setState({
      localStream:stream
    })
   
    
  }
  const failure = (e) => {
    console.log("getUserMedia Error:", e);
  }
  
  navigator.mediaDevices.getUserMedia({video : true}).then(success).catch(failure)




  // RTC methods


  

  

  
}

//RTC Method outside from componentDidMount()


createOffer = () =>{
  this.pc.createOffer({offerToReceiveVideo:1}).then((sdp)=>{
    console.log("pc1: ",sdp);
    this.pc.setLocalDescription(sdp);
    console.log(this.socket.id);

   
    
    this.socket.emit('offer', {id:this.socket.id,sdp});
  


  }).catch((e)=>{
    
    console.log("Error in creating offer: ", e)
  
  });
  

}


createAnswer = () =>{
  this.pc.createAnswer({offerToReceiveVideo:1}).then((sdp)=>{
    console.log("Set local P2");
    this.pc.setLocalDescription(sdp)
    console.log("P2 sending offer");
    this.socket.emit('offer', {id:this.socket.id,sdp});

  }).catch((e)=>{
    console.log("Error in creating answer:" , e)
  
  })
}








  render() {
    
    return (
     
      <div>
        
       <Video
       localVideo={this.state.localStream}
       ></Video>
       <Video
       localVideo={this.state.remoteStream}
       ></Video>

      <button onClick={this.createOffer}>Call</button>
      <textarea ref={ref=>{this.textref=ref}}/>
      <button onClick={this.createAnswer}>Recieve</button>
        </div>
    
    )
  }
}

export default App

