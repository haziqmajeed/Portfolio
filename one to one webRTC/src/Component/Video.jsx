import React, { Component } from 'react'

 class Video extends Component {
    constructor(props){
        super(props)
    }

    componentWillReceiveProps(nextProps){
        this.video.srcObject= nextProps.localVideo
    }

    render() {
        return (
            <div>
                <video
                autoPlay
                ref= {(ref)=>{this.video = ref}}
                style={{backgroundColor:'black',width:"50%"}}
                >
                </video>
                
                
            </div>
        )
    }
}

export default Video
