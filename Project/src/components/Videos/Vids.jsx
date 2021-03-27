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


    handleChange = (data) => {
      this.setState({
        participantActive:[...this.state.participantActive,data]
      })

    }

  
    
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
                trigger={false}
                check={this.handleChange}
             
                 
                />
                return (
                  <div>
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
        if (nextProps.members.length===0){

          if (this.state.participantActive.length>0){
          this.state.participantActive.map((data, index) => {
              data.change(false)
          })
          }
          

      }
      else{
        if (this.state.participantActive.length>0){
          for (var i =0;i<nextProps.members.length;i++){
              this.state.participantActive.map((data, index) => {
                  if(nextProps.members[i].id===data.id){
                    data.change(true)
                  }

              })
        }


          }


      }

      
    //     if(this.state.rVideos.length>0){  
         
    //       console.log("rVideos:",this.state.rVideos[0].props.children)  
    //       console.log("child:",this.state.rVideos[0].props.children.props.id)   
    //  }
        
       
        
    
       
    }
    
    
   
  
   


    render() { 
     
     
      

      
   
        return ( <div>

{ this.state.rVideos }
            
            


        </div> );
    }
}
 
export default Vids;
