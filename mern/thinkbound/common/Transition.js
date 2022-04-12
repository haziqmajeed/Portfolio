import gsap from 'gsap/gsap-core';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import thinkbound from '../images/logo/logo.png';
import { checkForScrollbar, getScrollbarWidth } from '../services/scrollbarService';

export default function Transition({playTransition}) {
    const timeline = useRef(null);
    let transition = useRef(null);
    let logo = useRef(null);

    function initTimeline() {
        return gsap.timeline({
            paused: true,
            onStart: () => {
                // document.body.style.pointerEvents = 'none';
                if (checkForScrollbar) {
                    // document.body.style.paddingRight = getScrollbarWidth() + 'px';
                    // document.getElementById('header').style.paddingRight = getScrollbarWidth() + 'px';
                    // document.body.style.overflow = 'hidden';
                }
            },
            onRestartComplete: () => {
                document.body.style.pointerEvents = null;
                if (checkForScrollbar) {
                   document.body.style.overflow = null;
                   document.getElementById('header').style.paddingRight = null;
                   document.body.style.paddingRight = null;
                }
            }
        })
        .to(transition.current, {
            duration: 1.2,
            y: '-200vh',
        }, 0)
        .from(logo.current, {
            // y: '100vh'
        }, 0)
        .to(transition.current, {
             //display:"none",
            //  y: '180vh'
        }, 1)
        .to(logo.current, {
            // duration: 0.5,
            // y: '-200vh'
        }, 1)
    }

    useEffect(() => {
        if (!timeline.current) {
            timeline.current = initTimeline();
        }

        if (playTransition) {
            timeline.current.restart();
        } else {
           // timeline.current.reverse();
        }
    }, [playTransition]);

    return (
        <div className="transition" ref={transition}>
            <div className="transition__logo" ref={logo}>
                {/* <Image src={thinkbound} alt="" /> */}
            </div>
        </div>
    )
}
