import Link from 'next/link';
import React from 'react';
import thinkboungLogo from '../../../icons/thinkbound.png';
import bg from '../../../images/footer/bg.png';
import Button from './../../../common/Button';
import Facebook from './../../../common/icons/Facebook';
import Instagram from './../../../common/icons/Instagram';
import LinkedIn from './../../../common/icons/LinkedIn';
import Twitter from './../../../common/icons/Twitter';

export default function Footer({FooterData, togglePopup, handleHover, handleLeave, handleHide}) {
    console.log('FooterData 1', FooterData)
    return (
        <footer className="footer" style={{backgroundImage: `url(${bg.src})`}}>
            <div className="footer__wrapper container">
                <div className="footer__columns">
                    <div className="footer__column footer__column--1">
                        <h1 className="footer__title" dangerouslySetInnerHTML={{__html: FooterData?.footerBy?.footer?.grid1?.title}} />
                        <Button type="button" text="Start Project" className="footer__button" icon={thinkboungLogo} onClick={togglePopup} />
                        <div className="footer__images">
                            {
                                FooterData?.footerBy?.footer?.grid1?.logos?.map((item, index) => {
                                    return <img key={index} className="footer__image" src={item?.logo?.sourceUrl} alt={item?.logo?.altText} onMouseOver={handleHover} onMouseLeave={handleLeave} />
                                })
                            }
                        </div>
                    </div>
                    <div className="footer__column footer__column--2">
                        <div className="footer__list-wrapper">
                            <h3 className="footer__list-title">{FooterData?.footerBy?.footer?.menu1?.title}</h3>
                            <ul className="footer__list">
                                {
                                    FooterData?.footerBy?.footer?.menu1?.menu?.map((item, index) => {
                                        return(
                                            <li key={index} className="footer__item">
                                                <Link href={item?.url}>
                                                    <a className="footer__link" onMouseOver={handleHover} onMouseLeave={handleLeave}>{item?.text}</a>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="footer__column footer__column--3">
                        <div className="footer__list-wrapper">
                        <h3 className="footer__list-title">{FooterData?.footerBy?.footer?.menu2?.title}</h3>
                            <ul className="footer__list">
                                {
                                    FooterData?.footerBy?.footer?.menu2?.menu?.map((item, index) => {
                                        return(
                                            <li key={index} className="footer__item">
                                                <Link href={item?.url}>
                                                    <a className="footer__link" onMouseOver={handleHover} onMouseLeave={handleLeave}>{item?.text}</a>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="footer__list-wrapper">
                        <h3 className="footer__list-title">{FooterData?.footerBy?.footer?.menu3?.title}</h3>
                            <ul className="footer__list">
                                {
                                    FooterData?.footerBy?.footer?.menu3?.menu?.map((item, index) => {
                                        return(
                                            <li key={index} className="footer__item">
                                                <Link href={item?.url}>
                                                    <a className="footer__link" onMouseOver={handleHover} onMouseLeave={handleLeave}>{item?.text}</a>
                                                </Link>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="footer__bottom">
                    <p className="footer__copyright">{FooterData?.footerBy?.footer?.footerBottom?.copyright}</p>
                    <div className="footer__social">
                        <h3 className="footer__social-title">Let’s Connect</h3>
                        <ul className="footer__social-list">
                            <li className="footer__social-item">
                                <a href={FooterData?.footerBy?.footer?.footerBottom?.facebookLink} className="footer__social-link" onMouseOver={handleHide} onMouseLeave={handleLeave}>
                                    <Facebook className="footer__social-icon"/>
                                </a>
                            </li>
                            <li className="footer__social-item">
                                <a href={FooterData?.footerBy?.footer?.footerBottom?.twitterLink} className="footer__social-link" onMouseOver={handleHide} onMouseLeave={handleLeave}>
                                    <Twitter className="footer__social-icon"/>
                                </a>
                            </li>
                            <li className="footer__social-item">
                                <a href={FooterData?.footerBy?.footer?.footerBottom?.linkedinLink} className="footer__social-link" onMouseOver={handleHide} onMouseLeave={handleLeave}>
                                    <LinkedIn className="footer__social-icon"/>
                                </a>
                            </li>
                            <li className="footer__social-item">
                                <a href={FooterData?.footerBy?.footer?.footerBottom?.instagramLink} className="footer__social-link" onMouseOver={handleHide} onMouseLeave={handleLeave}>
                                    <Instagram className="footer__social-icon"/>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}
