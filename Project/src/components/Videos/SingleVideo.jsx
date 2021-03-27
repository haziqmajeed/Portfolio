import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';





class SingleVideo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           active:null,
           inactive:null,
           
         }
        
    }

   
    handleChange = (data) => {
        if (this.props.admin){
            if (data){
                 this.setState({
                       active : <h4 style={{color:"green"}}>Status: Active</h4>,
                       inactive:null
                 })
             }
    
            if (!data){
       
                  this.setState({
                        active : null,
                        inactive:<h4 style={{color:"red"}}>Status: Inactive</h4>,
                })
        
              }
      }
    }

    componentDidMount(){
      
        this.props.check({change:this.handleChange,id:this.props.id})
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
            {this.state.active}
            {this.state.inactive}
              {Testing()}
            
           
        </div> 
        
        
        </Grid>
        
        );
    }
}
 
export default SingleVideo;