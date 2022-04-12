import Link from 'next/link';
import React, { useContext } from 'react';
import { LinkPropsContext } from '../../../providers/LinkPropsProvider';

export default function CaseCard({item}) {
    let { linkProps, setLinkProps } = useContext(LinkPropsContext);

    function handleLinkClick(e) {
        let link = e.currentTarget;

        let linkCoords = link.getBoundingClientRect();

        setLinkProps({
            left: linkCoords.left,
            top: linkCoords.top - (document.getElementById('header').clientHeight),
            width: linkCoords.width,
            height: linkCoords.height,
        });

        document.body.classList.add('no-scroll');
    }
    // function handleLinkClick(e) {
        
    //     let link = e.currentTarget;
    //     let links = document.querySelectorAll('[data-card]');

    //     links.forEach(otherLink => {
    //         if (otherLink !== link) {
    //             otherLink.style.opacity = '0';
    //         }
    //     })
    //     let image = link.querySelector('[data-image]');
    //     let coords = image.getBoundingClientRect();
    //     setLinkProps({
    //         left: coords.left,
    //         top: coords.top - (document.getElementById('header').clientHeight),
    //         width: coords.width,
    //         height: coords.height,
    //     });

    //     document.body.classList.add('no-scroll');
    // }

    return (
        <a href={item.uri} className="card card--case" data-card style={{ backgroundImage: `url(${item?.featuredImage?.node?.sourceUrl})` }}>
            <div className="card__wrapper">
                <p className="card__text">{item.text}</p>
                <h2 className="card__title">{item.title}</h2>
                <Link href={item.uri}>
                    <a  className="card__link" onClick={handleLinkClick}>
                        <span className="card__link-text">View Case Study</span>
                        <div className="arrow" />
                    </a>
                </Link>
            </div>
        </a>
    )
}
