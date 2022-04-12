import React from 'react';

export default function Popup({className, showPopup, togglePopup, children}) {

    function closePopup(e) {
        if (!e.target.closest('[data-popup-wrapper]')) {
            togglePopup();
        } 
    }
   
    return (
        <div className={"popup " + (className || "") + (showPopup ? " opened" : "")} onClick={closePopup}>
            {children}
        </div>
    )
}
