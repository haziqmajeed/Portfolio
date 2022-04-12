import gsap from 'gsap/gsap-core';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import background from '../images/industry/expanding-bg.png';

export default function ExpandingBackground({trigger, className}) {

    const bgRef = useRef(null);

    useEffect(() => {
        let bgTl = gsap.timeline({
            defaults: {
                duration: 1,
                ease: 'Power4.out'
            },
            scrollTrigger: {
                trigger: trigger.current,
                start: "top bottom",
                end: "bottom center",
            },
        })
        bgTl
            .to(bgRef.current, {
                width: '100%'
            })
    }, [trigger]);

    return (
        <div ref={bgRef} className={"expanding-background " + (className || "")}>
            <Image src={background} alt=""  />
        </div>
    )
}
