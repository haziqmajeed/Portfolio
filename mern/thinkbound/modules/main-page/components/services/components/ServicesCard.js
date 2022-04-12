import Link from 'next/link';
import React from 'react';
import Lottie from 'react-lottie';
import * as animation from '../../../../../animation';

export default function ServicesCard({ item, refs }) {
    let lottie = {
        loop: true,
        autoplay: true,
        animationData: animation[item?.cards?.icon],
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    }

    return (
        <li ref={el => refs.current.push(el)} className={"services__card "}>
            <div className="services__card-icon">
                <Lottie options={lottie} width="83%" height="auto" />
            </div>
            <div className="services__card-text">
                <h1 className="services__card-title">{item?.cards?.title}</h1>
                <ul className="services__card-list">
                    {item.cards.items.map((itemText, index) => {

                        return (
                            <li key={index} className="services__card-item arrow-hover">
                                <Link href={itemText.url ? itemText.url : "/"}>
                                    <a className="services__card-link">{itemText.title}</a> 
                                </Link>
                                <div className="arrow" />
                            </li>
                        );
                    })}
                </ul>
            </div>
        </li>
    )
}
