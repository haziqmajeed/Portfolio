
import gsap from 'gsap';

export default function animateSideTextParallax(wrapper, element) {

    let parallaxTl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'Power4.out'
        },
        scrollTrigger: {
            trigger: wrapper,
            start: "top center",
            end: "bottom center",
            scrub: 1
        },
    });

    parallaxTl
        .from(element, {
            yPercent: 30
        })
}