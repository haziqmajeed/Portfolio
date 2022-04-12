import { gsap } from 'gsap/gsap-core';
import React, { useEffect, useRef } from 'react';
import Button from '../../Button';

export default function CaseList({itemIndex, gallery}) {
    let textMasks = useRef([]);
    let texts = useRef([]);
    let image = useRef([]);
    let imageMask = useRef([]);

    useEffect(() => {
        let textMaskElements = textMasks.current;
        let textElements = texts.current;
        let imageMaskElement = imageMask.current;
        let imageElement = image.current;

        initCaseAnimation(textMaskElements, textElements, imageMaskElement, imageElement);
    }, [itemIndex])

    return (
        <ul className="case__list">
            <li className="case__item">
                <h4 className="case__item-title">Client: </h4>
                <div className="case__item-text-mask" ref={el => textMasks.current.push(el)}>
                    <div className="case__item-text" ref={el => texts.current.push(el)}>
                        <h3>{gallery[itemIndex]?.casesingle?.card?.client}</h3>
                        <ul>
                            {
                                gallery[itemIndex]?.casesingle?.card?.providedServices.map((item, index) => {
                                    return <li key={index}>{item?.text}</li>
                                })
                            }
                        </ul>
                    </div>
                </div>
            </li>
            <li className="case__item">
                <div className="case__item-text-mask" ref={el => textMasks.current.push(el)}>
                    <p className="case__item-text case__item-text--quote" ref={el => texts.current.push(el)}>
                        {gallery[itemIndex]?.casesingle?.card?.comment}
                    </p>
                </div>
            </li>
            <li>
                <Button type='link' className='case__button' text='View Case Study' href={gallery[itemIndex]?.uri} />
            </li>
        </ul>
    )
}

function initCaseAnimation(textMaskElements, textElements, imageMaskElement, imageElement) {
    
    let textTl = gsap.timeline({
        defaults: {
            duration: 0.4,
            ease: 'Power2.in'
        }
    });

    textTl
        .from(textElements, {
            yPercent: 100
        }, 0)
        .to(textElements, {
            yPercent: 0
        }, 0)
        .from(textMaskElements, {
            yPercent: -46
        }, 0)
        .from(imageElement, {
            yPercent: 130
        }, 0)
        .from(imageMaskElement, {
            yPercent: -90
        }, 0)
}
