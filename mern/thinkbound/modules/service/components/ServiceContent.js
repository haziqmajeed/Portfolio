import useWindowSize from '@charlietango/use-window-size';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import SlideIn from '../../../common/SlideIn';
import animateTextLine from '../../../services/animateTextLine';
import CustomParticles from './../../../common/CustomParticles/CustomParticles';

const ServiceContent = ({title, afterTitle, contentSections, image}) => {
    const {width} = useWindowSize();
    let textRef2 = useRef([]);

    useEffect(() => {
        animateTextLine(textRef2.current);
    }, [])

    return (
    <div className="service__content">
        <CustomParticles modificator="service" mobile={width < 768} />
        <div className="service__content-wrapper container" id="content">
            <SlideIn className="service__content-image" start="-50px bottom" setXPercent={100} toXPercent={0} trigger="#content">
                <div className="service__content-image-cont">
                    <Image className="service__tag-image__item" src={image?.sourceUrl} alt={image?.altText} layout="fill" />
                </div>
            </SlideIn>
            <SlideIn setYPercent={100} toYPercent={0} start="-50px bottom" className="service__content-title" trigger="#content">{title}</SlideIn>
            <SlideIn setYPercent={100} toYPercent={0} trigger="#content" start="-50px bottom">
                <div className="line-text service__line-text service__line-text--content">
                    <div className="line-text__row" ref={el => textRef2.current.push(el)}>
                        {afterTitle}
                    </div>
                </div>
            </SlideIn>
            {
               contentSections?.map((item, index) => {
                   return(
                        <div key={index} className="service__content-text" dangerouslySetInnerHTML={{__html: item?.content}} />
                   )
               }) 
            }
            
        </div>
    </div>
    )
}

export default ServiceContent
