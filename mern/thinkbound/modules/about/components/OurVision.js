import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import CustomParticles from '../../../common/CustomParticles/CustomParticles';
import SideText from '../../../common/SideText';
import SlideIn from '../../../common/SlideIn';
import parallaxAnimation from '../../../services/parallaxAnimation';

const OurVision = ({sectionText, content, counterText, number, image}) => {
    const visionImageElement = useRef(null);
    const visionColumn = useRef(null);
    const [count, setCount] = useState(0);

    console.log(image);
    let onSlideEnd = useCallback(() => {
        let interval = setInterval(() => {
            setCount((state) => {
                if (state === (number - 1)) {
                    clearInterval(interval);
                }
                return state + 1
            });
        }, 50)
    }, [number]);

    useEffect(() => {
        parallaxAnimation(visionImageElement.current, 40, 'top bottom', visionColumn.current);
    }, []);


    return (
        <div className="about__wrapper">
            <CustomParticles modificator="about" />
            <div className="about__vision container" id="vision-wrapper">
                <SideText modificator="vision" wrapper="vision-wrapper">{sectionText || ''}</SideText>
                <div className="about__vision-column about__vision-column--1">
                    <SlideIn className="about__vision-content" setXPercent={-100} toXPercent={0} trigger="#vision-wrapper">
                        <div className="about__content-text" dangerouslySetInnerHTML={{ __html: content }} />
                    </SlideIn>
                </div>
                <div className="about__vision-column about__vision-column--2" ref={visionColumn}>
                    <SlideIn setYPercent={120} toYPercent={0} delay={0.3} trigger="#vision-wrapper" callback={onSlideEnd}>
                        <div className="about__vision-image-wrapper">
                            <div className="about__vision-image" ref={visionImageElement}>
                                <Image className="about__client-logo__item" src={image?.sourceUrl} alt="" layout='fill' />
                            </div>
                        </div>
                        <div className="about__vision-count">
                            <strong>{count}+</strong>
                            <SlideIn setYPercent={100} toYPercent={0} delay={1} trigger="#vision-wrapper">{counterText}</SlideIn>
                        </div>
                    </SlideIn>
                </div>
            </div>
        </div>
    )
}

export default OurVision
