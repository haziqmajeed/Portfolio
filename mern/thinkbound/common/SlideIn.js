import { gsap } from 'gsap/gsap-core';
import React, { useEffect, useRef } from 'react';

export default function SlideIn({ children, setXPercent, setYPercent, toXPercent, toYPercent, opacity, trigger, toggleActions, delay, start, callback, ...props }) {

    let item = useRef(null);
    
    useEffect(() => {
        gsap.set(item.current, {
            xPercent: setXPercent || null,
            yPercent: setYPercent || null,
            autoAlpha: opacity ? 0 : 1
        });

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: trigger || item.current,
                start: start || 'top center',
                toggleActions: toggleActions || 'play none none none',
                //markers: true
            },
            onComplete: () => (callback ? callback() : false)
        }).to(item.current, {
            xPercent: toXPercent || 0,
            yPercent: toYPercent || null,
            autoAlpha: opacity || 1,
            delay: delay || 0
        });

        return () => {
            tl.kill();
        }
    }, [setXPercent, toXPercent, opacity, setYPercent, toYPercent, trigger, toggleActions, delay, start, callback]);

    if (opacity) {
        return (
            <div ref={item} {...props}>{children}</div>
        );
    } else {
        return (
            <div {...props} style={{ overflow: 'hidden' }}>
                <div ref={item}>{children}</div>
            </div>
        )
    }
}
