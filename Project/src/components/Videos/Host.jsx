import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';

class Host extends Component {
    constructor(props) {
        super(props);
     
        this.admin=null;

        this.state = {
            mic: false,
            camera: false, // by default is false to show microphone is off and camera is off acual functionality is in room file
          }
    }

   
    componentDidMount(){
      
        
     
       
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

        const Testing = () =>{
            if (this.props.admin === true){
                return (<Button
                  variant="contained"
                  color="primary"
                    onClick={(e)=>{ 
                      
                        
                         this.props.connection.emit("getAttention", {id:this.props.connection.id,room:this.props.room})
                        


                    }}
                >
                    
                    
                    Get Attention
                
                
                </Button>);
            }
        
        }
        
        return ( 
        
        <Grid container item xs={6} >
        <div style={{backgroundColor:'black',width:"50%"}}>
            <video autoPlay ref= {(ref)=>{this.video = ref}} style={{width:"95%"}}>

            </video>
            {muteControls}
            <h1 style={{color:'white'}}>{this.props.myName}</h1>
            {Testing()}
         
            
        </div> 
        
        
        </Grid>
        
        );
    }
}
 
export default Host;