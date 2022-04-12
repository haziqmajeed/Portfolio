import { gsap } from 'gsap/gsap-core';

export default function animateTextLine(textElements) {

    gsap.timeline({
        defaults: {
            duration: 1,
        },
        scrollTrigger: {
            trigger: textElements[0],
            start: "top center",
            onEnter: () => {
                gsap.set(textElements, {
                    className: 'line-text__row animation-out',
                    stagger: 0.5,
                    ease: 'Power4.out'
                }, 0)
            }
        }
    });
}