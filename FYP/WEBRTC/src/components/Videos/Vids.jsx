import { Grid } from '@material-ui/core'
import React, { Component } from 'react'
import Names from '../Names'
import SingleVideo from './SingleVideo'






class Vids extends Component {
    constructor(props) {
        super(props)  
        this.state = {
        remoteStreams:[],
        rVideos: [],
        participantActive:[],
        }
        
       

        
    }

    


    // handleChange = (data) => {
    //   this.setState({
    //     participantActive:[...this.state.participantActive,data]
    //   })

    // }

  
    
    componentWillReceiveProps(nextProps){
      
        if (this.props.remoteStreams !== nextProps.remoteStreams) {
        

            let _rVideos = nextProps.remoteStreams.map((rVideo, index) => {
              
            
              
              
                let video = <SingleVideo
                key={index}
                localStream={rVideo.stream}
                id={rVideo.id}
                name={rVideo.name}
                type={rVideo.userType}
                admin={nextProps.admin}
               
             //   check={this.handleChange}
             
                 
                />
               
            
                return (
               
                  
                    <div style={{marginRight:"100px",marginTop:"50px",marginLeft:"10px"}}>
                      {video}
                    </div>
                  
                
                )
               
               
              })
        
              this.setState({
                remoteStreams: nextProps.remoteStreams,
                rVideos: _rVideos
              })

        } 
       // checking if member lengthy is 0 it means all inactive other with in 
       //else we will check who is active then we set their status to active

      //   if (nextProps.members.length===0){

      //     if (this.state.participantActive.length>0){
      //     this.state.participantActive.map((data, index) => {
          
      //         data.change(false)
      //     })
      //     }
          

      // }


      //Error! :-
      //all participant are recieved and data.change function is also executed but when user2 left the status
      //of user 3 is deleted and status of user 2 is replaced with 3
      
      //Solution:-
      // We can save list of active users in file which we may have to create.
      
      // else{
      //   if (this.state.participantActive.length>0){
      //     nextProps.members.map((memb, index) => {
      //         this.state.participantActive.map((data, index) => {
      //             if(memb.id===data.id){ 
                    
      //               data.change(true)
      //             }

      //         })
      //       })


      //     }


      // }

      
    //     if(this.state.rVideos.length>0){  
         
    //       console.log("rVideos:",this.state.rVideos[0].props.children)  
    //       console.log("child:",this.state.rVideos[0].props.children.props.id)   
    //  }
        
       
        
    
       
    }
    
    
   
  
   


    render() { 
     
     
      

      
   
        return ( <div>
 <Grid container spacing={1}>
{ this.state.rVideos }
            
</Grid>


        </div> );
    }
}
 
export default Vids;