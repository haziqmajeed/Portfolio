import gsap from 'gsap/gsap-core';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef } from 'react';
import SideText from '../../../../../common/SideText';
import Tabs from '../../../../../common/Tabs';
import ExpandingBackground from './../../../../../common/ExpandingBackground';
import IndustryCard from './IndustryCard';

gsap.registerPlugin(ScrollTrigger);


export default function Industry(props) {
    let menuItemRefs = useRef([]);
    let industryWrapperRef = useRef(null);

    useEffect(() => {
        let menuItemElements = menuItemRefs.current;

        initMenuItemsAnimation(menuItemElements);
    }, [])

    const {sectionText, title, menuItems, image} = props

    return (
        <section className="section industry">
            <div ref={industryWrapperRef} className="industry__wrapper container" id="industry-wrapper">
                <SideText modificator="industry" wrapper="industry-wrapper">{sectionText}</SideText>
                <h1 className="industry__title" dangerouslySetInnerHTML={{ __html: title }} />
                <Tabs refs={menuItemRefs} className="tabs--industry" menuItems={menuItems} Component={IndustryCard} ComponentImage={image} />
            </div>
            <ExpandingBackground className="industry__expanding-background" trigger={industryWrapperRef} />
        </section>
    )
}

function initMenuItemsAnimation(menuItemElements) {

    ScrollTrigger.create({
        trigger: menuItemElements[0],
        start: "center 80%",
        onEnter: () => animateMenuItems(menuItemElements)
    })
}

function animateMenuItems(menuItemElements) {

    return gsap.to(menuItemElements, {
        duration: 0.3,
        xPercent: 110,
        stagger: 0.1,
        ease: 'Power4.out'
    })
}
