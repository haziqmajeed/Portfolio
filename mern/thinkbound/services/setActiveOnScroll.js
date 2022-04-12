import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function setActiveOnScroll(sections, links) {
    sections.forEach((item, index) => {
        if (!item) return;
        ScrollTrigger.create({
            trigger: item,
            start: 'top center',
            end: () => `+=${item.clientHeight}`,
            toggleClass: {
                className: 'active',
                targets: links[index]
            }
        });
    });
}
