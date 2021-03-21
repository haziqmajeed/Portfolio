import React, { Component } from 'react';
import { Grid, Button } from '@material-ui/core';
class Names extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            remoteNames:props.names
         }
        
    }

    

   

    
    render() 
    
    { 
        
        return ( 
        
        <Grid container item xs={4} >
            <h1>{this.state.remoteNames}</h1>
        
        </Grid>
        
        );
    }
}
 
export default Names;