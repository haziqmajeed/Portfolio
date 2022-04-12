import React, { useContext } from 'react';
import Lottie from 'react-lottie';
import * as animation from '../animation/';
import { CursorContext } from './../providers/CursorProvider';

export default function Tabs({ className, menuItems, Component, refs, iconsStopped, toggleIcons, ComponentImage }) {
    let { handleHover, handleLeave } = useContext(CursorContext);

    return (
        <div className={"tabs " + className}>
            <ul className="tabs__menu">
                {menuItems.map((item, index) => {
                    let lottie = {
                        loop: true,
                        autoplay: true,
                        animationData: animation[item.icon],
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                        },
                    }
                    return (
                        <li ref={el => refs.current.push(el)} key={index} className="tabs__menu-item">
                            <button className="tabs__menu-button" onMouseOver={handleHover} onMouseLeave={handleLeave}>
                                <div className="tabs__menu-icon">
                                    <Lottie options={lottie} />
                                </div>
                                <p className="tabs__menu-text">{item.title}</p>
                            </button>
                        </li>
                    );
                })}
            </ul>
            <ul className="tabs__wrapper">
                <li className="tabs__item">
                    <Component image={ComponentImage?.sourceUrl} />
                </li>
            </ul>
        </div>
    )
}
