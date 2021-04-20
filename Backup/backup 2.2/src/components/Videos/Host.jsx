import React, { Component } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';

class Host extends Component {
    constructor(props) {
        super(props);
     
        this.admin=null;

        this.state = {
            mic: false,
            camera: false, // by default is false to show microphone is off and camera is off acual functionality is in room file
            clicked:null,           
            timeOut:null,
            miniute:0,
            passSeconds:0,
            passMiniutes:0,
            

          }
    }

   
    componentDidMount(){     
        this.timeOut=setInterval(()=>{          
          if (!this.props.admin){            
            if (this.state.passMiniutes === Number(this.props.attendanceMiniute)){
              console.log("COMPLETED TIME")
            }
            if (this.state.passSeconds===2){ //givve 60 seconds here because 1 min = 60 sec
              if (this.state.passMiniutes===0)
              { 
                this.props.connection.emit("checkMyTime", {name:this.props.myName})
                this.props.connection.on('addMyTime', data => {
                  console.log("data:",data)
                  this.setState({
                    passMiniutes:data.miniute,
                  })
                })
              }
              
              
              
              this.setState({
                passSeconds:0,
                passMiniutes:this.state.passMiniutes + 1,
              })
              this.props.connection.emit("recieveMyTime", {miniute:this.state.passMiniutes,name:this.props.myName})

              

            }
           
           

          this.setState({
            passSeconds:this.state.passSeconds + 1,
            clicked:<h1>{this.state.passMiniutes}:{this.state.passSeconds}</h1>,
          })

          if (!this.props.attendanceMiniute){
            clearTimeout(this.timeOut)
            this.setState({
              clicked:<h1>No attendance is set by admin</h1>,
            })
          }

        }
        
        },1000)
      
     
       
    }


    componentWillReceiveProps(nextProps){
     
        this.video.srcObject= nextProps.localStream
      
    }
    mutemic = (e) => {
        const stream = this.video.srcObject.getTracks().filter(track => track.kind === 'audio')
        this.setState(prevState => {
          if (stream) stream[0].enabled = !prevState.mic
          return {mic: !prevState.mic}
        })
      }
    
      mutecamera = (e) => {
        const stream = this.video.srcObject.getTracks().filter(track => track.kind === 'video')
        this.setState(prevState => {
          if (stream) stream[0].enabled = !prevState.camera
          return {camera: !prevState.camera}
        })
      }
        

 

    
    render() 
    
    { 
        const muteControls = this.props.showMuteControls && (
            <div>
              <i onClick={this.mutemic} style={{ cursor: 'pointer', padding: 5, fontSize: 20, color: this.state.mic && 'white' || 'red' }} class='material-icons'>{this.state.mic && 'mic' || 'mic_off'}</i>
              <i onClick={this.mutecamera} style={{ cursor: 'pointer', padding: 5, fontSize: 20, color: this.state.camera && 'white' || 'red' }} class='material-icons'>{this.state.camera && 'videocam' || 'videocam_off'}</i>
            </div>
          )

        const Attention = () =>{
            if (this.props.admin === true){
                return (<Button
                  variant="contained"
                  color="primary"
                    onClick={(e)=>{ 
                      
                      this.props.callback()
                         this.props.connection.emit("getAttention", {id:this.props.connection.id,room:this.props.room})
                    }}
                >
                    Get Attention
                </Button>);
            }        
        }


        const setTime = () =>{
       
          if (this.props.admin === true){
            clearTimeout(this.timeOut)
              return (

              <div>
              
              <div>
                <h4>Set your attendance time before inviting participant</h4>
              <TextField id="standard-basic" label="Miniute" 
              onChange={(e)=>{this.setState({

                miniute:e.target.value
              
              })
            }
          }
              
              
              />

              
                 

              </div>
              <div>
              <Button
                variant="contained"
                color="primary"
               
                  onClick={(e)=>{ 
                    console.log("this.state.miniute",this.state.miniute)
                    this.setState({
                      clicked:<h4>time set : {this.state.miniute} miniute </h4>
                    })
                    this.props.connection.emit("setTime", {miniute:this.state.miniute,room:this.props.room})
                    

                  }}
              >
                  Set Time
              </Button>
              </div>
              
             
              </div>
              
              
              );
          }
          

          
         
          
          
        

            
            
          
      }


        
        return ( 
        
        <Grid container item xs={12} >
          <Grid item xs={6}>
        <div style={{backgroundColor:'black',width:"50%"}}>
            <video autoPlay 
            muted={this.props.muted}
            ref= {(ref)=>{this.video = ref}} style={{width:"95%"}}>

            </video>
            {muteControls}
            <h1 style={{color:'white'}}>{this.props.myName}</h1>
            {Attention()}
         
            
        </div> 

        </Grid>
        <Grid item xs={6}>
          
          {setTime()}

          {this.state.clicked}
        </Grid>
        
        </Grid>
        
        );
    }
}
 
export default Host;