import useWindowSize from '@charlietango/use-window-size';
import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'react-lottie';
import * as animation from '../animation';
import ExpandingBackground from '../common/ExpandingBackground';
import animateTextLine from '../services/animateTextLine';
import SideText from './SideText';
import SlideIn from './SlideIn';

export default function Approach(props) {
    const approachWrapper = useRef(null);
    const approachList = useRef(null);
    const approachText = useRef([]);

    const {width} = useWindowSize()

    const [smallScreen, setSmallScreen] = useState(false);

    function handleMobileScreen() {
        if (width < 480) {
            setSmallScreen(true);
        } else {
            setSmallScreen(false);
        }
    }

    useEffect(() => {
        handleMobileScreen();
        animateTextLine(approachText.current);

        window.addEventListener('resize', handleMobileScreen);

        return () => {
            window.removeEventListener('resize', handleMobileScreen);
        }
    }, [])

    const {sectionText, title1, title2, title3, approachs} = props

    return (
        <div className="approach" ref={approachWrapper} id="approach-wrapper">
            <div className="approach__wrapper container">
                <SideText modificator="approach" wrapper="approach-wrapper">{sectionText}</SideText>
                {smallScreen ?
                    <div className="line-text line-text--approach">
                        <div className="line-text__row" ref={el => approachText.current.push(el)}>{title1}</div>
                        <div className="line-text__row" ref={el => approachText.current.push(el)}>{title2}</div>
                        <div className="line-text__row" ref={el => approachText.current.push(el)}>{title3}</div>
                    </div> :
                    <div className="line-text line-text--approach">
                        <div className="line-text__row" ref={el => approachText.current.push(el)}>{title1} {title2}</div>
                        <div className="line-text__row" ref={el => approachText.current.push(el)}>{title3}</div>
                    </div>}
                <div className="approach__list" ref={approachList}>
                    {approachs.map((item, index) => {
                        let lottie = {
                            loop: true,
                            autoplay: true,
                            animationData: animation[item?.approachSingle?.icon],
                            rendererSettings: {
                                preserveAspectRatio: 'xMidYMid slice'
                            },
                        }
                        return (
                            <SlideIn opacity={1} delay={index / 5} trigger={approachList.current} className="approach__item" key={index}>
                                <div className="approach__item-icon">
                                    <Lottie options={lottie} />
                                </div>
                                <h6 className="approach__item-title">{item?.title}</h6>
                                <p className="approach__item-text">{item?.approachSingle?.text}</p>
                            </SlideIn>
                        );
                    })}
                </div>
            </div>
            <ExpandingBackground trigger={approachWrapper} className="approach__expanding-background" />
        </div>
    )
}
