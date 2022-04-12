import Image from 'next/image';
import React, { useContext } from 'react';
import { CursorContext } from './../providers/CursorProvider';

export default function Button({type, href, className, icon, text, ref, ...props}) {

    let { handleHover, handleLeave } = useContext(CursorContext);
    
    if (type === 'button') {
        return (
            <button className={"button " + (className || "")} onMouseOver={handleHover} onMouseLeave={handleLeave} ref={ref} {...props}>
                {icon ? <div className="button__icon"><Image src={icon} alt="" /></div> : null} 
                <div className="button__text">{text}</div>
            </button>
        )
    } else if (type === 'link') {
        return (
            <a href={href} className={"button " + (className || "")} onMouseOver={handleHover} onMouseLeave={handleLeave} ref={ref} {...props}>
                {icon ? <div className="button__icon"><Image src={icon} alt="" /></div> : null}      
                <div className="button__text">{text}</div>
            </a>
        )
    }
}
