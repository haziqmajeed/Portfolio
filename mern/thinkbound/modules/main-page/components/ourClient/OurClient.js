import Image from 'next/image';
import React, { useEffect, useRef } from 'react';


export default function OurClient(props) {
    const approachWrapper = useRef(null);
    const {title,clients} = props
    return (
        
        <div className='ourclient container' ref={approachWrapper}>
            <div className='ourclient__title'>
                <h1>{title}</h1>
            </div>
            <div className='ourclient__clients'>
            {clients?.map((data, index) => {
                // console.log("data",data?.image.sourceUrl)
                return (
                <div className='ourclient__image' key={index}>
                    <Image src={data?.image?.sourceUrl} height="100" width="100"/>
                </div>
                )
            })}
                
                
                
            </div>
         </div>
       
    )
}

