import React, { useContext, useEffect, useState } from 'react';
import SwiperCore, { EffectCoverflow, Navigation, Pagination, Swiper } from 'swiper/core';
import { CursorContext } from './../../providers/CursorProvider';
import CustomSwiperPagination from './CustomSwiperPagination';

SwiperCore.use([Navigation, Pagination, EffectCoverflow]);

export default function CustomSwiper({ gallery, Component, id, ClassName, options, setItemIndex, ...props }) {
    
    const [slides, setSlides] = useState({});
    let { handleHover, handleGrab, handleLeave } = useContext(CursorContext);

    useEffect(() => {
        initSwiper(setSlides, id, options, setItemIndex);
    }, [id, options, setItemIndex])

    return (
        <div className={"swiper swiper--" + ClassName} id={id}>
            <div className="swiper-container-wrapper">
                <button className="swiper-button swiper-button--left">
                    <span className="arrow arrow--v2"></span>
                </button>
                <div className="swiper-container">
                    <ul className="swiper-wrapper">
                        {gallery?.map((item, index) => {
                            return (
                                <li className="swiper-slide" key={index}>
                                    <Component item={item} {...props} />
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <button className="swiper-button swiper-button--right">
                    <span className="arrow arrow--v2"></span>
                </button>
            </div>
            <CustomSwiperPagination slides={slides} />
        </div>
    )
}

function initSwiper(setSlides, id, options, setItemIndex) {

    const swiper = new Swiper(`#${id} .swiper-container`, {
        slidesPerView: 1,
        spaceBetween: 40,
        pagination: {
            el: `#${id} .swiper-pagination`,
            type: 'progressbar'
        },
        navigation: {
            prevEl: `#${id} .swiper-button--left`,
            nextEl: `#${id} .swiper-button--right`,
        },
        grabCursor: true,
        ...options
    });

    setSlides({
        total: swiper.slides.length,
        current: 1
    });

    swiper.on('slideChange', () => {

        if (setItemIndex) {
            setItemIndex(swiper.realIndex);
        }

        setSlides({
            total: swiper.slides.length,
            current: ++swiper.realIndex
        })
    });
}
