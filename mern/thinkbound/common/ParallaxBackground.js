import React, { useEffect, useRef } from 'react';
import SectionBg from '../images/about/phones_bg.png';
import parallaxAnimation from '../services/parallaxAnimation';

export default function ParallaxBackground({image, className, percent}) {
    const element = useRef(null);

    useEffect(() => {
        parallaxAnimation(element.current, percent || 30, 'top bottom');
    }, [percent]);

    return (
        <div className={className} style={{backgroundImage: `url(${image || SectionBg.src})`}} ref={element}></div>
    )
}
