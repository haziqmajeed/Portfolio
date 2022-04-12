import Link from 'next/link';
import React from 'react';
import CustomSwiper from '../../../../../common/CustomSwiper/CustomSwiper';
import SideText from './../../../../../common/SideText';
import NewsCard from './NewsCard';


export default function News({ setLinkProps, handleHover, handleLeave, sectionText, title, url, posts, index }) {

    let options = {
        spaceBetween: 10,
        breakpoints: {
            989: {
                slidesPerView: 3,
            },
            620: {
                slidesPerView: 2,
                spaceBetween: 1,
            },
            319: {
                slidesPerView: 1,
            }
        }
    }

    function handleLinkClick(e) {
        console.log(1);
        let link = e.currentTarget;
        let links = document.querySelectorAll('[data-card]');
        links.forEach(otherLink => {
            if (otherLink !== link) {
                otherLink.style.opacity = '0';
            }
        })
        let image = link.querySelector('[data-image]');
        let coords = image.getBoundingClientRect();
        setLinkProps({
            left: coords.left,
            top: coords.top - (document.getElementById('header').clientHeight),
            width: coords.width,
            height: coords.height,
        });

        document.body.classList.add('no-scroll');
    }
    return (
        <section className="section news" id="news-wrapper">
            <div className="news__wrapper container">
                <div className="title title--button news__title">
                    <h2>{title}</h2>
                    <Link href={url}><a className="button news__button" onMouseOver={handleHover} onMouseLeave={handleLeave}>View all Blog Posts</a></Link>
                </div>
                <SideText modificator="news" wrapper="news-wrapper">{sectionText}</SideText>
                {
                    posts?.nodes && <CustomSwiper gallery={posts?.nodes} Component={NewsCard} ClassName="news" id={`news${index}`} options={options} onClick={handleLinkClick} />
                }
            </div>
        </section>

    )
}
