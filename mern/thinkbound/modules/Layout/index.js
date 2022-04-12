import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useRef } from "react";
import Button from '../../common/Button';
import Form from '../../common/Form';
import PageProgress from '../../common/PageProgress';
import Popup from '../../common/Popup';
import thinkboungLogo from '../../icons/thinkbound.png';
import { LoadedContext } from '../../providers/LoadedProvider';
import { MobileNavButtonContext } from '../../providers/MobileNavButtonProvider';
import Footer from '../footer/components/Footer';
import Header from '../header/components/Header';
import Seo from '../Seo';

gsap.registerPlugin(ScrollTrigger);

const Layout = ({ children, seo, HeaderData, FooterData, uri, bannerRef, handleHover, handleLeave, handleHide, togglePopup, headerRef, showPopup, mainClass }) => {
    const scrollTrigger = useRef(null);
    const router = useRouter()
    let loaded = useContext(LoadedContext);
    let { mobileMenuShow, setMobileMenuShow } = useContext(MobileNavButtonContext);

    useEffect(() => {
        const handleRouteChange = () => {
          console.log(
            `App is changing`
          )
          setMobileMenuShow(false)
        }
    
        router.events.on('routeChangeStart', handleRouteChange)
    
        // If the component is unmounted, unsubscribe
        // from the event with the `off` method:
        return () => {
          router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [router.events])

    useEffect(() => {
      let header = headerRef.current;
  
      scrollTrigger.current = ScrollTrigger.create({
          onUpdate: () => handleScrollUpdate(header, bannerRef.current),
      });
  
      return () => {
          scrollTrigger.current.kill();
      }
    }, [headerRef, bannerRef]);
  
    return (
        <>  
            <Seo seo={seo} uri={uri} />
            <Header
                    mobileMenuShow={mobileMenuShow}
                    setMobileMenuShow={setMobileMenuShow}
                    togglePopup={togglePopup}
                    handleHover={handleHover} handleLeave={handleLeave}
                    headerRef={headerRef}
                    HeaderData={HeaderData}
            />
            <PageProgress />
            <main className={mainClass}>
                {children}
            </main>
            <Footer FooterData={FooterData} togglePopup={togglePopup} handleHover={handleHover} handleLeave={handleLeave} handleHide={handleHide} />
            <Popup className="popup--form" showPopup={showPopup} togglePopup={togglePopup}>
                <div className="popup__wrapper" data-popup-wrapper>
                    <div className="popup__scrollwrapper">
                        <div className="popup__content">
                            <h1 className="popup__title">
                                <span>Start Project</span>
                                <button className="close popup__close" onClick={togglePopup} onMouseOver={handleHover} onMouseLeave={handleLeave} />
                            </h1>
                            <Form className="form--popup" closeForm={showPopup}
                                Button={<Button type="button" icon={thinkboungLogo} className="form__button" text="Start project" />}
                            />
                        </div>
                    </div>
                </div>
            </Popup>
        </>
    )
}

export default Layout


function handleScrollUpdate(header, banner) {

    setTimeout(() => {
        if (header.classList.contains('header--main')) {
            if (window.scrollY >= banner.clientHeight - header.offsetHeight) {
                header.classList.add('header--white');
            } else {
                header.classList.remove('header--white');
            }
        } else {
            header.classList.add('header--white');
        }
    }, 50)
}