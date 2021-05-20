import React, { Component } from 'react';
import { Grid, Button, List, ListItem, ListItemIcon, Divider, ListItemText, Typography } from '@material-ui/core';



class Names extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            active:[],

         }

       
        
    }
    componentWillReceiveProps(nextProps){
        let participantActive = nextProps.remoteStreams.map((all, index) => {
              let name = null;
              let flag=true;
            nextProps.members.map((user, index) => {

                if (user.id===all.id){
                    name = <List>
                    <ListItemText
                        primary={<Typography variant="h6" style={{ color: '#58cc4e' }}>{user.name}</Typography>}
                        secondary={<Typography variant="h6" style={{ color: 'green' }}>Active</Typography>}
                        />
                     </List>
                     flag=false
                }
            })

            if (flag===true){
                name = <List>
                    <ListItemText
                        primary={<Typography variant="h6" style={{ color: '#bf6b6b' }}>{all.name}</Typography>}
                        secondary={<Typography variant="h6" style={{ color: 'red' }}>InActive</Typography>}
                        />
                     </List>
            }
              
              
            
                    
         
             
            
           
        
            return (
           
              
                <div >
                  {name}
                </div>
              
            
            )
           
           
          })

          this.setState({
            active: participantActive
          })


    }

    
    

   

    
    render() 
    
    { 
        const checkAdmin = () =>{
            if (this.props.admin){
                return (
                 <div>
                    <h3 style = {{color:"#38ecf2"}}>Students List</h3>
                           
                    {this.state.active}
                </div>
                    
                );
            }
        
        }
        
        return ( 
            <div>
                {checkAdmin()}
                 
            </div>
        );
    }
}
 
export default Names;