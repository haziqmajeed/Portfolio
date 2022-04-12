import useWindowSize from '@charlietango/use-window-size';
import Image from 'next/image';
import React from 'react';
import SlideIn from '../../../common/SlideIn';
import Button from './../../../common/Button';
import CustomParticles from './../../../common/CustomParticles/CustomParticles';
import SideText from './../../../common/SideText';

const InnerpageLeftTextRightImageAndText = ({sectionText, content, image, buttons}) => {
    const {width} = useWindowSize();
    return (
        <div className="service__services service__services__top__0">
            <CustomParticles modificator="service" mobile={width < 768} />
            <div className="service__services-wrapper container">
                <SideText modificator="service" wrapper="services-wrapper">{sectionText}</SideText>
                <div className="service__services-columns">
                    <div className={`service__services-column service__services-column--1 ${image?.sourceUrl ? '' : 'service__services-column--1--noImg'} ${(image?.sourceUrl && buttons?.length !== 0) ? '' : 'service__services-column--1--full'}`}>
                        <SlideIn setXPercent={-100} toXPercent={0} start="-60% center" trigger="#services-wrapper" className="service__services-text">
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                        </SlideIn>
                    </div>
                    {(image?.sourceUrl && buttons?.length !== 0) &&
                        <div className={`service__services-column service__services-column--2 ${image?.sourceUrl ? '' : 'service__services-column--2--noImg'}`}>
                            {image?.sourceUrl &&
                                <SlideIn setYPercent={100} toYPercent={0} trigger="#services-wrapper" start="-60% center" delay={0.2}>
                                    <div className="service__services-image">
                                        <Image className="service__tag-image__item" src={image?.sourceUrl} alt={image?.altText} layout="fill" />
                                    </div>
                                </SlideIn>
                            }
                            {   buttons?.length !== 0 &&
                                <SlideIn className="service__services-buttons" start="-40% center" setYPercent={100} toYPercent={0} trigger="#services-wrapper" delay={0.5}>
                                    {
                                        buttons?.map((item, index) => {
                                            return(
                                                <Button key={index} type="link" href={item?.link} text={item?.text} className="service__services-button" />
                                            )
                                        })
                                    }
                                </SlideIn>
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default InnerpageLeftTextRightImageAndText
