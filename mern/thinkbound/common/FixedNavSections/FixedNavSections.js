import useWindowSize from '@charlietango/use-window-size';
import { gsap } from 'gsap/gsap-core';
import ScrollToPlugin from 'gsap/src/ScrollToPlugin';
import Image from 'next/image';
import React, { useContext, useEffect, useRef } from 'react';
import SlideIn from '../SlideIn';
import { CursorContext } from './../../providers/CursorProvider';
import setActiveOnScroll from './../../services/setActiveOnScroll';

gsap.registerPlugin(ScrollToPlugin);

export default function FixedNavSections({ navTitle, sections, className, headerRef }) {
    const {width} = useWindowSize();

    let { handleHover, handleLeave } = useContext(CursorContext);
    let items = useRef([]);
    let navButtons = useRef([]);

    console.log('navTitle', navTitle)

    function onLinkClick(e) {
        e.preventDefault();
        const target = e.nativeEvent.target.getAttribute('href');
        let section = document.getElementById(target);
        gsap.to(window, {
            scrollTo: section.getBoundingClientRect().top + window.scrollY - headerRef.current.clientHeight - (width < 480 ? 121 : 0),
            ease: 'Power4.inOut',
            duration: 0.5
        })
    }

    useEffect(() => {
        setActiveOnScroll(items.current, navButtons.current);
    }, [headerRef]);

    return (
        <div className={'sections ' + (className ? 'sections--' + className : '')}>
            <div className='sections__navigation'>
                <div className="sections__navigation-wrapper">
                    <h2 className='sections__navigation-title'>{navTitle}</h2>
                    <ul className='sections__navigation-list' id='sections-swiper-pagination'>
                        {sections.map((item, index) => {
                            return (
                                <li className='sections__navigation-item' key={index}>
                                    <a
                                        href={"section-" + index} className='sections__navigation-link'
                                        ref={el => navButtons.current.push(el)}
                                        onMouseOver={handleHover} onMouseLeave={handleLeave}
                                        onClick={onLinkClick}
                                    >{item.title}</a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <ul className='sections__list'>
                {sections.map((item, index) => {
                    return (
                        <li className='sections__item' key={index} ref={el => items.current.push(el)} id={"section-" + index}>
                            <div className='sections__item-wrapper'>
                                <h1 className='sections__item-title'>
                                    <SlideIn className='sections__item-icon' trigger={"#section-" + index} setXPercent={100} toXPercent={0}>
                                        <Image src={item.icon?.sourceUrl} alt='' width={100} height={100} style={{ display: 'block' }} />
                                    </SlideIn>
                                    <SlideIn trigger={"#section-" + index} setXPercent={-100} toXPercent={0}>{item.title}</SlideIn>
                                </h1>
                                <SlideIn className='sections__item-text' trigger={"#section-" + index} setYPercent={100} toYPercent={0}>{item.text}</SlideIn>
                                <SlideIn className='sections__item-image-wrapper' trigger={"#section-" + index} setYPercent={100} toYPercent={0}>
                                    <div className='sections__item-image'>
                                        <Image width={1000} height={521} src={item.image?.sourceUrl} alt={item.image?.altText} />
                                    </div>
                                </SlideIn>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}