// If we want to use this software publically
//Use stun server
// use your local IP when creating socket.io


import React, { Component } from 'react';
import io from 'socket.io-client'
import SingleVideo from './Videos/SingleVideo'
import Vids from './Videos/Vids'
import queryString from 'query-string';
import Host from './Videos/Host';
import Popup from './Popup/Popup';
import { green, red } from '@material-ui/core/colors';
import { Button, withStyles } from '@material-ui/core';
class Room extends Component {
  constructor(props) {
    super(props)

    this.state = {
      localStream: null,    
      videoStream:null,

      stopCapture:null,
      
      startCapture:null,

      screenShare:null,

      peerConnections: {},     
  
      remoteStreams:[],

      attentiveParticipant:[],

      attention:null,
      
      trigger:false,

      //ye stun server ha firewall break krnay ke liyey used in RTCPeerConnection(pc_config)
      pc_config: {
        "iceServers": [ 
          {
            urls : 'stun:stun.l.google.com:19302'
          }
        ]
      },

      sdpConstraints: {
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': true
        }
      },
    }

   
    this.serviceIP = 'https://6d7750f22129.ngrok.io/webrtcPeer' // change with ngrok to use application on other devices
    this.socket = null
    this.admin=null;
    this.room = null;
    this.name = null;
    this.timeOut=null;
    this.pc=null;
    this.screenShare=null;



    
  
    
  }


  

  handleChange = (adminData) => {
    if (this.timeOut) {
      clearTimeout(this.timeOut) // clearing time out here if user press ok
      this.timeOut = null
    }

   
    this.socket.emit('attentiveParticipant', {id:this.socket.id,name:this.name,adminId:adminData.adminId,room:this.room})

    this.setState({ 
      trigger: false,
      attention:null,
    });
  }

  getLocalStream = () => {

    

    
  
    const successVideo = (stream) => {
      stream.getVideoTracks()[0].enabled = false; // by default local stream camera and mic is off
      stream.getAudioTracks()[0].enabled = false;
    
      

      if (this.state.screenShare){
        let videoTrack = stream.getVideoTracks()[0];
        for (var connection in this.state.peerConnections){
          var sender = this.state.peerConnections[connection].getSenders()
          var test = sender.find(function(s) {
            return s.track.kind == videoTrack.kind;
          });
          test.replaceTrack(videoTrack);
        }
  
      }

      if(!this.state.screenShare){ //check that screen share is on or off if on then don't run this function for peers
        console.log("whoISONLINE")
      this.whoisOnline()
    }
//just button styling
    const ColorButton = withStyles((theme) => ({
      root: {
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        "&:hover": {
          backgroundColor: green[700]
        }
      }
    }))(Button);
    //just button styling
    
      this.setState({
        videoStream:true,
        screenShare:false,
        startCapture:<ColorButton 
        variant="contained"
        color="primary" 
    
        onClick={()=>{this.getScreenShare()}} 
        
        >Screen Share
        
        
        
        </ColorButton>,
        stopCapture:null,
        localStream: stream
      })



      
  }

  
    const failureVideo = (e) => {
      console.log('getUserMedia Error: ', e)
    }



  
    const constraints = {
      audio: true,
      video: true,
     
      options: {
        mirror: true,
      }
    }



      navigator.mediaDevices.getUserMedia(constraints)
      .then(successVideo)
      .catch(failureVideo)



  }

//StopScreenSharing


stopScreenShare= () =>{

  this.getLocalStream()

  
}






//screensharing
  getScreenShare = () => 
  { //COMPUTER SCREENSHARING but work on multiple on computer
    //same computer can't share 2 screens


    //just button styling
    const ColorButton = withStyles((theme) => ({
      root: {
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        "&:hover": {
          backgroundColor: red[700]
        }
      }
    }))(Button);
    //just button styling use


    const successScreen = (stream) => {
      this.setState({
        videoStream:false,
        screenShare:true,
        startCapture:null,
        stopCapture:<ColorButton  
        
        variant="contained"
        color="Secondary" 
        onClick={()=>{this.stopScreenShare()}}>
         
         
          Stop Capture
          
          
          </ColorButton>,
        localStream: stream
      })

      let videoTrack = stream.getVideoTracks()[0];
      for (var connection in this.state.peerConnections){
        var sender = this.state.peerConnections[connection].getSenders()
        var test = sender.find(function(s) {
          return s.track.kind == videoTrack.kind;
        });
        test.replaceTrack(videoTrack);
      }

    }


    const failureScreen = (e) => {
      console.log('getUserMedia Error: ', e)
    }
    const constraints = {
      audio: true,
      video: true,
     
      options: {
        mirror: true,
      }
    }
   
     
      navigator.mediaDevices.getDisplayMedia(constraints)
      .then(successScreen)
      .catch(failureScreen)
    
   

     
     
    
  }
  whoisOnline = () => {
    this.socket.emit('onlinePeers', {id:this.socket.id,room:this.room,name:this.name})
  }


  createPeerConnection = (socketID,name,type, callback) => {
  


    try {
      console.log("creating pc ",socketID)
      this.pc = new RTCPeerConnection(this.state.pc_config)
      

    
      console.log("set pc ")
      this.setState({
        peerConnections:{ ...this.state.peerConnections, [socketID]: this.pc }
      })

      this.pc.onicecandidate = (e) => {

        
        if (e.candidate) {
          this.socket.emit('candidate',{candidate:e.candidate,local:this.socket.id,remote:socketID})
        }
      }

      
      

      this.pc.ontrack = (e) => {    
        console.log("ONTRACk")
        // this.state.localStream.getVideoTracks()[0].enabled = false;
        
        let _remoteStream = null
        let remoteStreams = this.state.remoteStreams
        let remoteVideo = {}
        let rtpSender=null;

        //checking if already exist stream
        const rVideos = this.state.remoteStreams.filter(stream => stream.id === socketID)

     
        if (rVideos.length) { // agr stream phlay se ha to sirf audio track add kr do otherwise run else part and create new
          _remoteStream = rVideos[0].stream
          rtpSender = _remoteStream.addTrack(e.track, _remoteStream)
          console.log("rtpSender:",rtpSender)
          remoteVideo = {
            ...rVideos[0],
            stream: _remoteStream,
          }
          remoteStreams = this.state.remoteStreams.map(_remoteVideo => {
            return _remoteVideo.id === remoteVideo.id && remoteVideo || _remoteVideo
          })
        } else {
          
          _remoteStream = new MediaStream()
          rtpSender = _remoteStream.addTrack(e.track, _remoteStream)
          console.log("rtpSender:",rtpSender)

          remoteVideo = {
            id: socketID,
            name:name,
            userType:type,
            stream: _remoteStream,
          }
          remoteStreams = [...this.state.remoteStreams, remoteVideo]
        }

         
       
          
          this.setState(prevState => {

            const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: _remoteStream }
  
            return {
         
           
              ...remoteStream,
              remoteStreams,
            }
          })



      }

      this.pc.close = () => {
      
      }

      this.pc.oniceconnectionstatechange = (e) => {
       

      }

      if (this.state.localStream)
        console.log("LOCALSTREAM IF")
        this.pc.addStream(this.state.localStream)

     
      callback(this.pc)

    } catch(e) {
      console.log('Something went wrong! pc not created!!', e)
     
      callback(null)
    }
  }



  componentDidMount = () => {
    console.log("SOCKET CREATED");

    this.socket = io(
      this.serviceIP, // used local host address
      {
        path: '/haziq',
        query: {}
      }

    )

    // attentive participant here those who click active after attention popup appear
this.socket.on('recieveAttentiveParticipant', data => { 
  const tempParticipant = {
    id: data.participantId,
    name:data.participantName,
  }

  this.setState(prevState => {

    const participant = prevState.attentiveParticipant.length > 0 ? {} : { participant: data.id }

    return {
 
   
      ...participant,
      attentiveParticipant: [...prevState.attentiveParticipant, tempParticipant]
    }
  })
// here create a file for attentive participant
  console.log("attentiveParticipant:",this.state.attentiveParticipant)
})




      // Admin:Other users attention popup here

    this.socket.on('attention', data => {
      
      this.setState({
        trigger:true
      })

     
      this.timeOut =  setTimeout(() => {
       
        this.setState({
          trigger:false,
          attention:false
        })
    }, 8000);
  

      this.setState({
        attention:<Popup trigger={this.state.trigger} check = {this.handleChange} adminData={data}> 
        <h3>ATTENTION!</h3>
        <p>Host is watching you !!!</p>
        </Popup>
      }) 
    })

    
    // start from here
    this.socket.on('connection-success', myId => {
      const { name, room } = queryString.parse(this.props.location.search); // FOR ROOM CREATING
      this.name=name;
      this.room=room;


      this.socket.emit('checkAdmin', {room:this.room})
      this.socket.on('admin', data => {
        if(data==="admin"){
          this.admin=true;
          console.log("AMADMIN")
        }

      })



      this.getLocalStream()

      
      

      
    })

    this.socket.on('peer-disconnected', data => {
      console.log('peer-disconnected', data)


      const remoteStreams = this.state.remoteStreams.filter(stream => stream.id !== data.socketID)

      this.setState(prevState => {
     
     
        return {
    
          remoteStreams,
        
        }
        }
      )
    })

    this.socket.on('online-peer', data => {

     
      
      
   
      this.createPeerConnection(data.id,data.name,data.type, pc => {
     
          if (pc)
          pc.onnegotiationneeded = () =>{
            pc.createOffer(this.state.sdpConstraints)
              .then(sdp => {
                pc.setLocalDescription(sdp)
                console.log("Sending offer")
                this.socket.emit('offer',{sdp,local:this.socket.id,remote:data.id,name:this.name}) // inform 1st one here
          })
        }
        })
    })

    this.socket.on('offer', data => {
     
      


      this.createPeerConnection(data.socketID,data.name,data.type, pc => {
       // pc.addStream(this.state.localStream)

        pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
    
          pc.createAnswer(this.state.sdpConstraints)
            .then(sdp => {
              pc.setLocalDescription(sdp)
              console.log("Sending Answer")
              this.socket.emit('answer',{sdp,local:this.socket.id,remote:data.socketID})
            })
        })
      })
    })

    this.socket.on('answer', data => {


      const pc = this.state.peerConnections[data.socketID]
  console.log("recieving Answer")
      pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(()=>{})
    })

    this.socket.on('candidate', (data) => {
      const pc = this.state.peerConnections[data.local]
      console.log("IceCandid ")
      if (pc)
        pc.addIceCandidate(new RTCIceCandidate(data.candidate))
    })

    

    

  }

 

  

  render() {
    console.log("Trigger:",this.state.trigger)
    console.log("PeerConnections:",this.state.peerConnections)
    console.log("localStream:",this.state.localStream)
    console.log("remoteStreams:",this.state.remoteStreams)
    return (
      <div>
        <Host localStream={this.state.localStream} myName={this.name} admin={this.admin} connection={this.socket} room={this.room} showMuteControls={true}/>         
        {this.state.startCapture}
         {this.state.stopCapture}
        <Vids remoteStreams={this.state.remoteStreams}/>
        {this.state.attention}
      </div>
    )
  }
}

export default Room;