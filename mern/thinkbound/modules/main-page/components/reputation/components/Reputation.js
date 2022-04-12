import gsap from 'gsap';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import useWindowSize from '@charlietango/use-window-size';
import React, { useEffect, useRef } from 'react';
import CustomParticles from '../../../../../common/CustomParticles/CustomParticles';
import SlideIn from '../../../../../common/SlideIn';
import circle from '../../../../../images/reputation/circle.png';
import SideText from './../../../../../common/SideText';

export default function Reputation(props) {
    let textRefs = useRef([]);
    let imagesWrapper = useRef(null);
    const {width} = useWindowSize();

    useEffect(() => {

        let textElements = textRefs.current;

        gsap.timeline({
            defaults: {
                duration: 1,
            },
            scrollTrigger: {
                trigger: textElements[1],
                start: "top center",
                onEnter: () => animateTextLine(textElements)
            }
        })
    }, [])

    const {title, sectionText, lineText1, lineText1Highlight, lineText2, images} = props
    return (
        <section className={lineText2 ? "section reputation" : 'section reputation reputationStorage'} style={lineText2 ? width < 990 ? {paddingBottom: "40px"} : {paddingBottom: "214px"} : {} }>
            <CustomParticles modificator="reputation" />
            <div className="reputation__wrapper container" id="reputation-wrapper">
                <SideText modificator="reputation" wrapper="reputation-wrapper">{sectionText}</SideText>
                {!isEmpty(lineText1) || !isEmpty(lineText2) ? (<div className="line-text reputation__line-text">
                    {!isEmpty(lineText1) && <div className="line-text__row" ref={el => textRefs.current.push(el)}>
                        {lineText1}&nbsp;
                        {!isEmpty(lineText1Highlight) && <span ref={el => textRefs.current.push(el)}>{lineText1Highlight}</span>}
                    </div>}
                    {!isEmpty(lineText2) && <div className="line-text__row" ref={el => textRefs.current.push(el)}>{lineText2}</div>}
                </div>) : null}
                {!isEmpty(title) && <h2 className={`reputation__title ${!isEmpty(lineText1) || !isEmpty(lineText2) ? '' : 'margin-top-0'}`}>{title}</h2>}
                <div className={lineText2 ? 'reputation__circle' : 'reputation__circleStorage'}><Image src={circle} alt="" /></div>
                <div className={lineText2 ? 'reputation__images' : 'reputation__imagesStorage'} ref={imagesWrapper}>
                    {
                        images.map((item, index) => {
                            return(
                                <SlideIn key={index} className={lineText2 ? 'reputation__image' : 'reputation__imageStorage'} opacity={1} delay={index / 10} trigger={imagesWrapper.current}>
                                    <Image
                                    className="reputation__image__item"
                                    src={item.image.sourceUrl} 
                                    alt=""
                                    layout="fill"
                                    />
                                </SlideIn>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}

function animateTextLine(textElements) {
    return gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power4.out'
        }
    })
        .set(textElements, {
            className: 'line-text__row animation-out',
            stagger: 0.5,
            ease: 'Power4.out'
        }, 0)
        .set(textElements[0], {
            className: 'line-text__row animation-remove',
        }, 0.5)
        .set(textElements[0], {
            className: 'line-text__row animation-stick',
        }, 1.5)
}
