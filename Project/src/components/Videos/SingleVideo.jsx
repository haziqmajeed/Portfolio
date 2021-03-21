import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';





class SingleVideo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           
            
         }
        
    }

    

    componentDidMount(){
     
        if (this.props.localStream) {
            this.video.srcObject = this.props.localStream
          }
          


    }

    componentWillReceiveProps(nextProps) { 
        

        if (nextProps.localStream && nextProps.localStream !== this.props.localStream) {

            
            this.video.srcObject = nextProps.localStream

        }
      }

   
    

    
    render() 
    
    { 

        const Testing = () =>{
            if (this.props.type === "admin"){
                return (<p>(HOST)</p>);
            }
        
        }
        


        return ( 
        
        <Grid item xs={4} >
        <div>
            <video autoPlay ref= {(ref)=>{this.video = ref}} style={{backgroundColor:'black',width:"200px"}}></video>    
            <h2 >{this.props.name}</h2> 
              {Testing()}
            
           
        </div> 
        
        
        </Grid>
        
        );
    }
}
 
export default SingleVideo;