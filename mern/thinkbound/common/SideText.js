import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap/gsap-core';

export default function SideText({ percent, wrapper, children, modificator, fullHeight }) {

    let element = useRef(null);

    useEffect(() => {
        let wrapperElement = document.getElementById(wrapper);
        if (fullHeight) {
            gsap.to(element.current, {
                ease: 'none',
                scrollTrigger: {
                    trigger: wrapperElement,
                    start: "top center",
                    scrub: 1
                },
                top: '80%',
            })
        } else {
            gsap.from(element.current, {
                scrollTrigger: {
                    trigger: wrapperElement,
                    start: "top center",
                    end: "bottom center",
                    scrub: 1
                },
                yPercent: percent ? percent : 30,
            })
        }
    }, [percent, wrapper, fullHeight]);

    return (
        <div ref={element} className={"side-text" + (modificator ? " side-text--" + modificator : "")}>{children}</div>
    )
}

