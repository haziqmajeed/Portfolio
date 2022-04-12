import Image from 'next/image';
import React, { useRef } from 'react';
import SlideIn from '../../../common/SlideIn';

const Clients = ({handleHover, handleLeave, title, clients}) => {
    const clientsWrapper = useRef(null);
    return (
        <div className="about__wrapper">
            <h3 className="about__title about__title--small container">Some of our clients</h3>
            <div className="about__clients container" ref={clientsWrapper}>
                {clients.map((client, index) => {
                    return (
                        <SlideIn opacity={1} delay={index / 5} trigger={clientsWrapper.current} start="center 100%" className="about__client" key={index}>
                            <div className="about__client-background"></div>
                            <div className="about__client-logo about__client-logo--main">
                                <Image className="about__client-logo__item" src={client?.logo?.sourceUrl} alt={client?.logo?.altText} layout="fill" />
                            </div>
                            <div className="about__client-hidden">
                                <div className="about__client-logo about__client-logo--small">
                                    <Image className="about__client-logo__item" src={client?.logo?.sourceUrl} alt={client?.logo?.altText} layout="fill" />
                                </div>
                                <a href={client.website} className="about__client-link" onMouseOver={handleHover} onMouseLeave={handleLeave}>{client.website}</a>
                            </div>
                        </SlideIn>
                    );
                })}
            </div>
        </div>
    )
}

export default Clients
