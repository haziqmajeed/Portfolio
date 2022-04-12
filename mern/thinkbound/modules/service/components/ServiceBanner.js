import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import useWindowSize from '@charlietango/use-window-size';
import Form from '../../../common/Form';
import SlideIn from '../../../common/SlideIn';
import thinkboungLogo from '../../../icons/thinkbound.png';
import animateTextLine from '../../../services/animateTextLine';
import Button from './../../../common/Button';
import background from '../../../images/about/phones_bg.png';

const ServiceBanner = ({title, text, images,backgroundImage}) => {
    let banner = useRef(null);
    let textRef = useRef([]);
    let oneLine = "";
    text.map((item, index) => {
        oneLine = oneLine + item.text + " "
    })
    const { width } = useWindowSize();
    
    useEffect(() => {
        animateTextLine(textRef.current);
    }, [])

    return (
        <div className={`${backgroundImage ? 'service__banner1':'service__banner'} `} ref={banner}>
           {backgroundImage ?  <div className='service__image'>
                {
                width < 380 ?  
                <Image src={backgroundImage?.sourceUrl} alt={backgroundImage?.altText} width='1920px' height="4020px" /> 
                : 
                width < 420 ?  
                <Image src={backgroundImage?.sourceUrl} alt={backgroundImage?.altText} width='1920px' height="3720px" /> 
                :  
                  width < 768 ?  
                  <Image src={backgroundImage?.sourceUrl} alt={backgroundImage?.altText} width='1920px' height="4020px" /> 
                :
                 (width > 1440 ? <Image src={backgroundImage?.sourceUrl} alt={backgroundImage?.altText} width='1920px' height="650px" /> 
                 :  
                 <Image src={backgroundImage?.sourceUrl} alt={backgroundImage?.altText} width='1920px' height="1020px" />
                 )
                }           
                </div> : <></>}
            <div className={`${backgroundImage ? "service__image-wrapper" : ""} service__banner-wrapper container`}>
                <h1 className="service__banner-title service__banner-column service__banner-column--1">
                    {title}
                    {backgroundImage ? <Image src="/canada.png" className='canada-image' width={40} height={50}/> : <></>}
                </h1>
                {backgroundImage ? 
                width < 960 ? 
                <div className="line-text service__line-text service__line-text--banner service__banner-column service__banner-column--1">
                    {oneLine}
                </div>
                : 
                <div className="line-text service__line-text service__line-text--banner service__banner-column service__banner-column--1">
                    {
                        text.map((item, index) => {
                            return(
                                <div key={index} className="line-text__row" ref={el => textRef.current.push(el)}>
                                    {item.text}
                                </div>
                            )
                        })
                    }
                </div>
                : 
                <div className="line-text service__line-text service__line-text--banner service__banner-column service__banner-column--1">
                    {
                        text.map((item, index) => {
                            return(
                                <div key={index} className="line-text__row" ref={el => textRef.current.push(el)}>
                                    {item.text}
                                </div>
                            )
                        })
                    }
                </div>}
                {backgroundImage ? <></> : <ul className="service__tags service__banner-column service__banner-column--1">
                    {
                        images?.map((item, index) => {
                            return(
                                <li key={index} className="service__tag">
                                    <SlideIn opacity={1} trigger={banner.current} delay={0.3}>
                                        <div className="service__tag-image">
                                            <Image className="service__tag-image__item" src={item.image.sourceUrl} alt={item.image.altText} layout="fill" />
                                        </div>
                                    </SlideIn>
                                </li>
                            )
                        })
                    }

                </ul> }
                <SlideIn opacity={1} trigger={banner.current} delay={0.7} className="service__banner-column service__banner-column--2">
                    <Form className="form--service" Button={<Button type="button" icon={thinkboungLogo} className={backgroundImage ? "form__button form__removebgbtn" : "form__button" } text="Start project"  />} storage={backgroundImage ? true : false} />
                </SlideIn>
            </div>
        </div>
    )
}

export default ServiceBanner
