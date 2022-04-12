import { gsap } from 'gsap/gsap-core';
import React, { useContext, useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import * as animation from '../../../animation';
import geoAnimation from '../../../animation/geo.json';
import mailAnimation from '../../../animation/mail.json';
import phoneAnimation from '../../../animation/phone.json';
import Button from '../../../common/Button';
import Form from '../../../common/Form';
import LadderText from '../../../common/LadderText';
import CustomParticles from './../../../common/CustomParticles/CustomParticles';
import SideText from './../../../common/SideText';
import { CursorContext } from './../../../providers/CursorProvider';
import animateTextLine from '../../../services/animateTextLine';


const mailOptions = {
    loop: true,
    autoplay: true,
    animationData: mailAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const phoneOptions = {
    loop: true,
    autoplay: true,
    animationData: phoneAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const geoOptions = {
    loop: true,
    autoplay: true,
    animationData: geoAnimation,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
};

const ContactInfo = ({beforeFormText, title, sectionText, contactInfo}) => {
    console.log("contactInfo",contactInfo)
    let textRef = useRef([]);
    const ladderText = useRef([]);
    
    let { handleHover, handleLeave } = useContext(CursorContext);

    useEffect(() => {
        animateTextLine(textRef.current);
        initLadderAnimation(ladderText.current);
    }, []);

    return (
        <>
            <CustomParticles modificator="contact" />
            <div className="contact__wrapper container" id="contact-wrapper">
                <SideText modificator="contact" wrapper="contact-wrapper">{sectionText}</SideText>
                <LadderText refs={ladderText} className="contact__title" text={title} />
                <ul className="contact__list">
                    {
                        contactInfo.map((item, index) => {
                            let lottie = {
                                loop: true,
                                autoplay: true,
                                animationData: animation[item.icon],
                                rendererSettings: {
                                    preserveAspectRatio: 'xMidYMid slice'
                                }
                            };
                            return(
                                <li key={index} className="contact__item" name="phone">
                                    <a href={item?.link || "#"} className="contact__item-link"
                                        onMouseOver={handleHover}
                                        onMouseLeave={handleLeave}
                                    >
                                        <div className="contact__image-wrapper">
                                            <Lottie options={lottie} width="75%" height="75%" />
                                        </div>
                                        <div className="contact__item-column">
                                            <h3 className="contact__item-title">{item?.title}</h3>
                                            <div className="contact__item-text">{item?.text}</div>
                                        </div>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="line-text contact__line-text">
                    <div className="line-text__row" ref={el => textRef.current.push(el)}>{beforeFormText}</div>
                </div>
                <Form className="form--contact" Button={<Button type="button" text="Send Us Message" className="form__button" />} />
            </div>
        </>
    )
}

export default ContactInfo

function initLadderAnimation(ladderTextElements) {
    return gsap.timeline({
        defaults: {
            delay: 0.2,
            duration: 0.4,
            ease: 'Power4.in'
        }
    }).from(ladderTextElements, {
        yPercent: 100,
        stagger: 0.1
    })
}
