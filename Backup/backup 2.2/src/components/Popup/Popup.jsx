import { Button } from '@material-ui/core';
import React , { useState,useEffect } from 'react';
import './Popup.css'



const Popup = (props) => {
    
    
    return  (props.trigger) ? (<div className="popup">
        <div className="popup-inner">
            <Button className="close-btn" 
             variant="contained"
             color="primary"
            
            
            onClick={()=>{
                props.check(props.adminData)
                
                
                
                }}>
                Active!
            </Button>
            {props.children}
        </div>
    </div>
    ) : "";
}
 
export default Popup