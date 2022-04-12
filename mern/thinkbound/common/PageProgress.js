import { gsap } from 'gsap/gsap-core';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from 'react';
import scrollImage from '../icons/scroll_top.svg';
import { CursorContext } from './../providers/CursorProvider';


export default function PageProgress() {
    const [count, setCount] = useState(0);
    let track = useRef(null);
    let imageWrapper = useRef(null);
    let image = useRef(null);

    let { handleHover, handleLeave } = useContext(CursorContext);
 
    useEffect(() => {

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                scrub: true,
                toggleActions: 'start pause reverse reset',
                onUpdate: () => {
                    let docElement = document.documentElement,
                        body = document.body,
                        st = 'scrollTop',
                        sh = 'scrollHeight';

                    let percent = (docElement[st] || body[st]) / ((docElement[sh] || body[sh]) - docElement.clientHeight) * 100;
                    if (parseInt(percent)) {
                        setCount(parseInt(percent));
                    }
                }
            },
        })
            .to(track.current, {
                width: '100%',
            }, 0)
            .to(image.current, {
                rotate: 360
            }, 0)
    }, [])

    return (
        <div className={'page-progress' + (count < 5 ? ' top' : '')}>
            <button
                className='page-progress__image-wrapper'
                ref={imageWrapper}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                onMouseOver={handleHover} onMouseLeave={handleLeave}
            >
                <div className='page-progress__image' ref={image}>
                    <Image src={scrollImage} alt='' />
                </div>
                <span className='page-progress__count'>{count}%</span>
            </button>
            <div className='page-progress__bar'>
                <div className='page-progress__track' ref={track}></div>
            </div>
        </div>
    )
}
