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
        }
        
       

        
    }

  
    
    componentWillReceiveProps(nextProps){
     
        if (this.props.remoteStreams !== nextProps.remoteStreams) {
        

            let _rVideos = nextProps.remoteStreams.map((rVideo, index) => {
              
            
              
             
                let video = <SingleVideo
                localStream={rVideo.stream}
                id={rVideo.id}
                name={rVideo.name}
                type={rVideo.userType}
              
                
                 
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
        
       
        
    
       
    }
    
   

    
   


    render() { 
        
        
        return ( <div>

{ this.state.rVideos }
            
            


        </div> );
    }
}
 
export default Vids;