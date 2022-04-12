import { gsap } from 'gsap/gsap-core';

export default function parallaxAnimation(element, percent, start, trigger) {
    
    return gsap.timeline({
        defaults: {
            ease: 'none',
        },
        scrollTrigger: {
            scrub: true,
            trigger: trigger || element,
            start: start || 'top center'
        }
    }).to(element, {
        yPercent: percent,    
    });
}