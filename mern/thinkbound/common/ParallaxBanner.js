import { motion } from 'framer-motion';
import { gsap } from 'gsap/gsap-core';
import React, { useContext, useEffect, useRef } from 'react';
//import smoothscroll from 'smoothscroll-polyfill';
import { CursorContext } from './../providers/CursorProvider';
import parallaxAnimation from '../services/parallaxAnimation';

//smoothscroll.polyfill();

let transition = { duration: 0.2, ease: [0.43, 0.13, 0.23, 0.96] };

export default function ParallaxBanner({ className, backgroundImage, title, animateTitle = false, scrollDown, percent, id, linkProps, immediateStart, headerRef, video, beforeTitle, scalePercent }) {
    let { handleHover, handleLeave } = useContext(CursorContext);
    const banner = useRef(null);
    let bannerTitle = useRef(null);
    let bannerImage = useRef(null);
  
    function handleArrowClick() {
        let position = banner.current.getBoundingClientRect().bottom;
        if (typeof window !== 'undefined') {
            window.scrollTo({
                top: position + window.scrollY - headerRef.current.clientHeight,
                behavior: 'smooth'
            });
        }
    }
    console.log("backgroundImage", backgroundImage)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'auto' });
        }
        if (headerRef) {
            parallaxAnimation(id ? `#${id}` : "#banner", percent, immediateStart ? 'top ' + headerRef.current.clientHeight + 'px' : 'top bottom');
        }

        if (animateTitle) {
            initTitleAnimation(bannerTitle.current);
            initBannerImageAnimation(bannerImage.current, scalePercent);
        }
    }, [percent, animateTitle, id, scalePercent, immediateStart, headerRef]);

    if (linkProps) {
        return (
            <div className={"banner banner--v2 " + (className ? className : "")} ref={banner}>
                <div className="banner__wrapper" id={id}>
                    <motion.div
                        initial={{
                            ...linkProps,
                        }}
                        exit={{ opacity: 0 }}
                        animate={{
                            width: '100%',
                            height: '110%',
                            transition: { delay: 0.1, duration: 0.75, transition },
                            left: 0,
                            top: 0
                        }}
                        className="banner__image-wrapper"
                        ref={bannerImage}
                    >
                        <div className="banner__image" style={{ backgroundImage: `url(${backgroundImage?.sourceUrl})` }}></div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.4 }}
                        animate={{ opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.75, transition } }}
                        className="banner__wrapper-inner container"
                    >
                        <h1 className="banner__title" ref={bannerTitle}>{title}</h1>
                        <button className="banner__arrow" onClick={handleArrowClick} onMouseOver={handleHover} onMouseLeave={handleLeave}></button>
                    </motion.div>
                </div>
            </div>
        );
    } else {
        return (
            <div className={"banner banner--v2 " + (className ? className : "")} ref={banner}>
                <div className="banner__wrapper" id={animateTitle ? (id || "banner") : null}>
                    <div className="banner__image-wrapper" id={!animateTitle ? (id || "banner") : null} ref={bannerImage}>
                        {video ?
                            <video className="video video--banner" autoPlay muted loop playsInline>
                                <source src={video?.mediaItemUrl} />
                            </video> :
                            <div className="banner__image" style={{ backgroundImage: `url(${backgroundImage?.sourceUrl})` }}></div>}
                    </div>
                    <div className="banner__wrapper-inner container" ref={bannerTitle}>
                        {beforeTitle ? <div className="banner__upper-title">{beforeTitle}</div> : null}
                        <h1 className="banner__title">
                            {beforeTitle ? <span>{title}</span> : title}
                        </h1>
                    </div>
                    {scrollDown ? <button className="banner__arrow" onClick={handleArrowClick} onMouseOver={handleHover} onMouseLeave={handleLeave}></button> : null}
                </div>
            </div>
        );
    }
}

function initTitleAnimation(title) {

    return gsap.to(title, {
        scale: 2,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
            scrub: true
        }
    });
}

function initBannerImageAnimation(image, scalePercent) {

    return gsap.to(image, {
        scale: scalePercent || 3,
        ease: 'none',
        scrollTrigger: {
            scrub: true
        }
    });
}