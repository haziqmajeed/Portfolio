import { gsap } from 'gsap/gsap-core';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import SlideIn from '../../../common/SlideIn';
import bg from "../../../images/service/bg.png";

const ServicesCard = ({beforeTitle, title, services}) => {
    let bgRef = useRef(null);
    let cardsWrapperRef = useRef(null);

    useEffect(() => {
        initBackgroundAnimation(bgRef.current, cardsWrapperRef.current);
    }, [])

    return (
        <div className="service__services" id="services-wrapper">
            <div className="service__cards-wrapper container" ref={cardsWrapperRef}>
                <div className="title title--center service__cards-title">
                    <div className="title__cat">{beforeTitle}</div>
                    <h1>{title}</h1>
                </div>
                <ul className="service__cards" id="services-cards">
                    {
                        services.map((item, index) => {
                            return(
                                <li key={index} className="service__card">
                                    <SlideIn className="service__card-wrapper" start="-30% center" opacity={1} delay={0.1} trigger="#services-cards">
                                        <div className="service__card-image">
                                            <Image width={97} height={97} src={item?.image?.sourceUrl} alt={item?.image?.altText} />
                                        </div>
                                        <h3 className="service__card-title">{item?.title}</h3>
                                        <p className="service__card-text">
                                            {item?.text}
                                        </p>
                                    </SlideIn>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="service__background" ref={bgRef}>
                <Image src={bg} alt="" />
            </div>
        </div>
    )
}

export default ServicesCard

function initBackgroundAnimation(bgElement, trigger) {

    let bgTl = gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'Power4.out'
        },
        scrollTrigger: {
            trigger: trigger,
            start: "top center",
            end: "bottom center",
        },
    });
    bgTl
        .from(bgElement, {
            width: 0
        })
}