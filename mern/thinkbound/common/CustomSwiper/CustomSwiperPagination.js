import React from 'react'

export default function CustomSwiperPagination({slides}) {
    return (
        <div className="swiper-pagination-wrapper">
            <span className="swiper-pagination-count swiper-pagination-count--left">{slides.current}</span>
            <span className="swiper-pagination"></span>
            <span className="swiper-pagination-count swiper-pagination-count--right">{slides.total / 2}</span>
        </div>
    )
}
