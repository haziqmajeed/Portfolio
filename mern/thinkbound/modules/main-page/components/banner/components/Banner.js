import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';
import LadderText from '../../../../../common/LadderText';
import gear from '../../../../../icons/gear.png';
import thinkboungLogo from '../../../../../icons/thinkbound.png';
import Button from './../../../../../common/Button';
import addToRefs from '../../../../../services/addToRefs';
import parallaxAnimation from '../../../../../services/parallaxAnimation';


export default function Banner(props) {

    const {bannerVideo, titleText1, titleText2, content, btnText, btnUrl, togglePopup, bannerRef} = props

    const titleMasks = useRef([]);
    const titleTexts = useRef([]);
    const ladderTexts = useRef([]);
    const bannerWrapper = useRef(null);
    const videoWrapper = useRef(null);
    const bannerContent = useRef(null);
    const buttons = useRef([]);

    function initBannerTextAnimation() {


        let textTl = gsap.timeline({
            defaults: {
                duration: 0.7,
                ease: 'Power4.in'
            },
            delay: 0.5
        });

        textTl
            .from(titleTexts.current, {
                yPercent: 100, stagger: 0.1
            }, 0)
            .to(titleTexts.current, {
                yPercent: -4, stagger: 0.1
            }, 0)
            .from(titleMasks.current, {
                yPercent: -46, stagger: 0.1
            }, 0)

        let ladderTl = gsap.timeline({
            defaults: {
                duration: 0.2,
                ease: 'Power4.in'
            }
        });

        ladderTl.from(ladderTexts.current, {
            yPercent: 100,
            stagger: 0.1
        });

        let buttonsTl = gsap.timeline({
            defaults: {
                duration: 0.2,
                ease: 'Power4.in'
            }
        }).to(buttons.current, {
            yPercent: -100,
            stagger: 0.2
        })

        let bannerTl = gsap.timeline();

        bannerTl
            .add(textTl)
            .add(ladderTl)
            .add(buttonsTl);
    }

    useEffect(() => {
        initBannerTextAnimation();
        parallaxAnimation(bannerWrapper.current, 60, "top top");
    }, [bannerRef])

    return (
        <section className="banner banner--main" ref={bannerRef}>
            <div className="banner__wrapper" ref={bannerWrapper}>
                <div className="container">
                    <video className="video video--main" autoPlay muted loop ref={videoWrapper} playsInline>
                        <source src={bannerVideo?.mediaItemUrl} />
                    </video>
                    <div ref={bannerContent}>
                        <h1 className="banner__title">
                            <div ref={el => addToRefs(el, titleMasks)} className="banner__title-text-mask">
                                <div ref={el => addToRefs(el, titleTexts)} className="banner__title-text">{titleText1}</div>
                            </div>
                            <div ref={el => addToRefs(el, titleMasks)} className="banner__title-text-mask">
                                <div ref={el => addToRefs(el, titleTexts)} className="banner__title-text banner__title-text--blue">{titleText2}</div>
                            </div>
                        </h1>
                        <LadderText
                            refs={ladderTexts}
                            className="banner__text"
                            text={content}
                        />
                        <div className="banner__buttons">
                            <div className="banner__button-wrapper" ref={el => addToRefs(el, buttons)}> 
                                <Button className='banner__button' type='button' icon={thinkboungLogo} text='Start Project' onClick={togglePopup} />
                            </div>
                            <div className="banner__button-wrapper" ref={el => addToRefs(el, buttons)}>
                                <Button className='banner__button button--white button--transparent' type='link' icon={gear} text={btnText} href={btnUrl} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}