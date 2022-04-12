import gsap from 'gsap/gsap-core';
import React, { useEffect, useRef, useState } from 'react';
import SideText from '../../../../../common/SideText';
import ServicesCard from './ServicesCard';

export default function Services(props) {
    let cardRefs = useRef([]);
    let cardWrapperRef = useRef(null);
    const [iconsStopped, setIconsStopped] = useState([true, true, true, true]);

    useEffect(() => {
        let cardElements = cardRefs.current;
        let cardWrapperElement = cardWrapperRef.current;

        initCardsParallax(cardElements, cardWrapperElement);
    }, [])

    const {sectionText, servicesTextSmall, title, servicesCards} = props

    return (
        <section className="section services container" id="services-wrapper">
            <SideText modificator="services" wrapper="services-wrapper">{sectionText}</SideText>
            {
                servicesTextSmall && title && <div className="services__text-wrapper">
                            <div className="services__text services__text--small">{servicesTextSmall}</div>
                            <h2 className="services__text services__text--sticky">{title}</h2>
                        </div>
            }
            <ul className={`services__cards ${servicesTextSmall && title ? '' : 'services__cards--full-width'}`} ref={cardWrapperRef}>
                {servicesCards.map((item, index) => {
                    return <ServicesCard refs={cardRefs} key={index} item={item} />
                })}
            </ul>
        </section>

    )
}

function initCardsParallax(cardElements, cardWrapperElement) {

    let parallaxTl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'Power1.out'
        },
        scrollTrigger: {
            trigger: cardWrapperElement,
            start: "top center",
            end: "bottom top",
            scrub: 1
        },
    });

    parallaxTl
        .from(cardElements, {
            yPercent: 15,
            stagger: 0.12
        })
}
