import useWindowSize from '@charlietango/use-window-size';
import gsap from 'gsap/gsap-core';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import React, { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import * as animation from '../../../animation';
import SideText from '../../../common/SideText';
import SlideIn from '../../../common/SlideIn';
import addToRefs from '../../../services/addToRefs';
import animateTextLine from '../../../services/animateTextLine';
import setActiveOnScroll from '../../../services/setActiveOnScroll';

//without this line, ScrollToPlugin may get dropped by your bundler...
gsap.registerPlugin(ScrollToPlugin);

const Expertise = ({headerRef, sectionText, title, expertise, index }) => {
    const {width} = useWindowSize();
    let mobileScreen = width < 990;
    const expertiseWrapper = useRef(null);
    const expertiseTitle = useRef([]);
    const sections = useRef([]);
    const links = useRef([]);
    const SectionIndex = index;

    function onLinkClick(e) {
        e.preventDefault();
        const target = e.nativeEvent.target.getAttribute('href');
        let section = document.getElementById(target);
        if (process.browser) {
            gsap.to(window, {
                scrollTo: section.getBoundingClientRect().top + window.scrollY - headerRef.current.clientHeight - 141,
                ease: 'Power4.inOut',
                duration: 0.5
            });
        }
    }

    useEffect(() => {
        animateTextLine(expertiseTitle.current);
        setActiveOnScroll(sections.current, links.current);
    }, []);

    return (
        <div className="about__wrapper">
            <div className="about__expertise container" id="expertise-wrapper">
                <SideText modificator="expertise" wrapper="expertise-wrapper">expertise</SideText>
                {mobileScreen ?
                    <nav className="about__expertise-nav">
                        <h3 className="about__title about__title--nav">Areas of expertise</h3>
                        <ul className="about__expertise-navlist">
                            {expertise.map((item, index) => {
                                return (
                                    <li className="about__expertise-navitem" key={index}>
                                        <a href={`link-${SectionIndex}` + index} className="about__expertise-navlink" onClick={onLinkClick} ref={el => addToRefs(el, links)}>{item.title}</a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav> :
                    <div className="line-text line-text--expertise about__title about__title--expertise">
                        <h3 className="line-text__row" ref={el => addToRefs(el, expertiseTitle)}>Areas of expertise</h3>
                    </div>}
                <ul className="about__expertise-list" ref={expertiseWrapper}>
                    {expertise.map((item, index) => {
                        let icon = {
                            loop: true,
                            autoplay: true,
                            animationData: animation[item?.icon],
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            },
                        }
                        return (
                            <li className="about__expertise-item" key={index} id={`link-${SectionIndex}` + index} ref={el => addToRefs(el, sections)}>
                                <SlideIn setXPercent={-100} toXPercent={0} trigger={expertiseWrapper.current} delay={mobileScreen ? 0 : index / 5}>
                                    <div className="about__expertise-title">
                                        <div className="about__expertise-icon">
                                            <Lottie options={icon} width="82%" height="auto" />
                                        </div>
                                        <h5>{item.title}</h5>
                                    </div>
                                </SlideIn>
                                <div className="about__expertise-text">
                                    {item.texts.map((textItem, index) => {
                                        return (
                                            <SlideIn setYPercent={-200} toYPercent={0} trigger={expertiseWrapper.current} delay={mobileScreen ? 0 : index / 9} className="about__expertise-text-item" key={index}>
                                                <div className="about__expertise-text-wrapper">{textItem.text}</div>
                                            </SlideIn>
                                        );
                                    })}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Expertise
