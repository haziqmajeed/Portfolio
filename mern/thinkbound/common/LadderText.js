import React from 'react'
import addToRefs from '../services/addToRefs';

export default function LadderText({ className, text, refs}) {

    let textArr = text.split(' ');
    
    return (
        <p className={className}>
            {textArr.map((item, i) => {
                return (
                    <span key={item + i} className="text-mask">
                        <span ref={el => addToRefs(el, refs)}>{item + ' '}</span>
                    </span>
                );
            })}
        </p>
    )
}
