import React , { useState,useEffect } from 'react';
import './Popup.css'



const Popup = (props) => {
    
    
    return  (props.trigger) ? (<div className="popup">
        <div className="popup-inner">
            <button className="close-btn" onClick={()=>{
                props.check(props.adminData)
                
                
                
                }}>
                OK
            </button>
            {props.children}
        </div>
    </div>
    ) : "";
}
 
export default Popup