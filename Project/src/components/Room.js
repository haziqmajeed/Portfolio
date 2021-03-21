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
class Room extends Component {
  constructor(props) {
    super(props)

    this.state = {
      localStream: null,    
     
      peerConnections: {},     
  
      remoteStreams:[],

      attentiveParticipant:[],

      attention:null,
      
      trigger:false,

      //ye stun server ha firewall break krnay ke liyey used in RTCPeerConnection(pc_config)
      // pc_config: {
      //   "iceServers": [ 
      //     {
      //       urls : 'stun:stun.l.google.com:19302'
      //     }
      //   ]
      // },

      sdpConstraints: {
        'mandatory': {
            'OfferToReceiveAudio': true,
            'OfferToReceiveVideo': true
        }
      },
    }

   
    //this.serviceIP = 'http://localhost:8080/webrtcPeer'
    this.socket = null
   this.admin=null;
    this.room = null;
    this.name = null;
    this.timeOut=null;
   
    
  }

  handleChange = (adminData) => {
    if (this.timeOut) {
      clearTimeout(this.timeOut) // clearing time out here if user press ok
      this.timeOut = null
    }

    console.log("adminData:",adminData)
    this.socket.emit('attentiveParticipant', {id:this.socket.id,name:this.name,adminId:adminData.adminId,room:this.room})

    this.setState({ 
      trigger: false,
      attention:null,
    });
  }

  getLocalStream = () => {
  
    const success = (stream) => {
     
     console.log("MY STREAM:",stream)
      this.setState({
        localStream: stream
      })

      this.whoisOnline()
    }

  
    const failure = (e) => {
      console.log('getUserMedia Error: ', e)
    }

  
    const constraints = {
      // audio: true,
      video: true,
     
      options: {
        mirror: true,
      }
    }


    navigator.mediaDevices.getUserMedia(constraints)
      .then(success)
      .catch(failure)
  }

  whoisOnline = () => {
    this.socket.emit('onlinePeers', {id:this.socket.id,room:this.room,name:this.name})

    


  }


  createPeerConnection = (socketID,name,type, callback) => {
  


    try {
      let pc = new RTCPeerConnection(null)
      

    
     
      this.setState({
        peerConnections:{ ...this.state.peerConnections, [socketID]: pc }
      })

      pc.onicecandidate = (e) => {

        
        if (e.candidate) {
          this.socket.emit('candidate',{candidate:e.candidate,local:this.socket.id,remote:socketID})
        }
      }

      
      

      pc.ontrack = (e) => {    

        // this.state.localStream.getVideoTracks()[0].enabled = false;
         
        const tempVideo = {
            id: socketID,
            name:name,
            userType:type,
            stream: e.streams[0]
          }

          
          this.setState(prevState => {

            const remoteStream = prevState.remoteStreams.length > 0 ? {} : { remoteStream: e.streams[0] }
  
            return {
         
           
              ...remoteStream,
              remoteStreams: [...prevState.remoteStreams, tempVideo]
            }
          })



      }

      pc.close = () => {
      
      }

      pc.oniceconnectionstatechange = (e) => {
       

      }

      if (this.state.localStream)
        pc.addStream(this.state.localStream)

     
      callback(pc)

    } catch(e) {
      console.log('Something went wrong! pc not created!!', e)
     
      callback(null)
    }
  }



  componentDidMount = () => {
    console.log("SOCKET CREATED");

    this.socket = io(
      "/webrtcPeer", // used local host address
      {
        path: '/haziq',
        query: {}
      }

    )
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

  console.log("attentiveParticipant:",this.state.attentiveParticipant)
})




      // Admin:Other users attention popup here

    this.socket.on('attention', data => {
      
      this.setState({
        trigger:true
      })

     
      this.timeOut =  setTimeout(() => {
        console.log("Hello")
        this.setState({
          trigger:false,
          attention:false
        })
    }, 8000);
  

      console.log("I am getting attention:", data)
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
            pc.createOffer(this.state.sdpConstraints)
              .then(sdp => {
                pc.setLocalDescription(sdp)
                this.socket.emit('offer',{sdp,local:this.socket.id,remote:data.id,name:this.name}) // inform 1st one here
          })
        })
    })

    this.socket.on('offer', data => {
     
      


      this.createPeerConnection(data.socketID,data.name,data.type, pc => {
        pc.addStream(this.state.localStream)

        pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(() => {
    
          pc.createAnswer(this.state.sdpConstraints)
            .then(sdp => {
              pc.setLocalDescription(sdp)
              this.socket.emit('answer',{sdp,local:this.socket.id,remote:data.socketID})
            })
        })
      })
    })

    this.socket.on('answer', data => {

      const pc = this.state.peerConnections[data.socketID]
  
      pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(()=>{})
    })

    this.socket.on('candidate', (data) => {
      const pc = this.state.peerConnections[data.local]
 
      if (pc)
        pc.addIceCandidate(new RTCIceCandidate(data.candidate))
    })

    

    

  }

 

  

  render() {
    console.log("Trigger:",this.state.trigger)
    console.log("remoteStreams:",this.state.remoteStreams)
    return (
      <div>
        <Host localStream={this.state.localStream} myName={this.name} admin={this.admin} connection={this.socket} room={this.room}/>         
        <Vids remoteStreams={this.state.remoteStreams}/>
        {this.state.attention}
      </div>
    )
  }
}

export default Room;