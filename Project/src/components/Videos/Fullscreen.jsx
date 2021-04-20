import { indigo } from '@material-ui/core/colors';
import React, { Component } from 'react';
class Fullscreen extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
        if(this.props.localStream){
            this.video.srcObject= this.props.localStream
        }
    }


    

    render() { 
        return ( <div>
            <h3>FullScreen Mode</h3>
            <video 
            autoPlay 
            ref= {(ref)=>{this.video = ref}}
            style={{width:"500%",cursor: 'pointer'}}
            onClick={()=>{
                this.props.exitFullScreen()
            }}
            
            
            >
            </video>
        </div> );
    }
}
 
export default Fullscreen;