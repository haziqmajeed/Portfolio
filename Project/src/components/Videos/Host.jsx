import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';

class Host extends Component {
    constructor(props) {
        super(props);
     
        this.admin=null;
    }

   
    componentDidMount(){

        
     
       
    }


    componentWillReceiveProps(nextProps){
     
        this.video.srcObject= nextProps.localStream

      
    }

    

 

    
    render() 
    { 

        const Testing = () =>{
            if (this.props.admin === true){
                return (<button
                    onClick={(e)=>{ 
                      
                        
                         this.props.connection.emit("getAttention", {id:this.props.connection.id,room:this.props.room})
                        


                    }}
                >
                    
                    
                    Get Attention
                
                
                </button>);
            }
        
        }
        
        return ( 
        
        <Grid container item xs={6} >
        <div>
            <video autoPlay ref= {(ref)=>{this.video = ref}} style={{backgroundColor:'black'}}></video>
            <h1>{this.props.myName}</h1>
            {Testing()}
         
            
        </div> 
        
        
        </Grid>
        
        );
    }
}
 
export default Host;