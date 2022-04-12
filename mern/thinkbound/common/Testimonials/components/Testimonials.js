import React, { useRef } from 'react';
import clutchIcon from '../../../icons/clutch.png';
import thinkboundIcon from '../../../icons/thinkbound.png';
import bg from '../../../images/testimonials/bg.png';
import Button from '../../Button';
import CustomSwiper from '../../CustomSwiper/CustomSwiper';
import SideText from '../../SideText';
import TestimonialsCard from './TestimonialsCard';


export default function Testimonials({title, sectionText, textSmall, url, index, testimonialsGallery, testimonials, togglePopup}) {
    let caseWrapperRef = useRef(null);

    let options = {
        initialSlide: 1,
        centeredSlides: true,
        spaceBetween: 0,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 20,
            stretch: 124,
            depth: 250, 
            modifier: 1,
            slideShadows: false,
        },
        loop: true,
        breakpoints: {
            989: {
                coverflowEffect: {
                    stretch: 103,
                },
                slidesPerView: 2,
            },
            767: {
                coverflowEffect: {
                    stretch: 71,
                },
                slidesPerView: 2,
            },
            319: {
                coverflowEffect: {
                    stretch: -100,
                },
                slidesPerView: 1,
            },
        }
    }

    //console.log("testimonials", testimonials)

    return (
        <section className="section testimonials" ref={caseWrapperRef} style={{backgroundImage: `url(${bg.src})`}}>
            <div className="testimonials__wrapper container" id="testimonials-wrapper">
                <div className="title title--center">
                    <div className="title__cat">{textSmall}</div>
                    <h2>{title}</h2>
                </div>
                <SideText modificator="testimonials" wrapper="testimonials-wrapper">{sectionText}</SideText>
                <CustomSwiper gallery={testimonials} Component={TestimonialsCard} ClassName="testimonials" id={`testimonials_${index}`} options={options} />
                <div className="testimonials__buttons">
                    <Button type='link' className='testimonials__button' text='View in Clutch' href='#' icon={clutchIcon} />
                    <Button type='button' className='testimonials__button' text='Start Project' icon={thinkboundIcon} onClick={togglePopup} />
                </div>
            </div>
        </section>

    )
}