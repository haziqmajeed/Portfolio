import useWindowSize from '@charlietango/use-window-size';
import { gsap } from 'gsap/gsap-core';
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from "react";
import client from "../../apollo/client";
import CustomParticles from '../../common/CustomParticles/CustomParticles';
import ParallaxBanner from '../../common/ParallaxBanner';
import SideText from '../../common/SideText';
import SlideIn from '../../common/SlideIn';
import img1 from '../../images/case-studies/img1.png';
import Layout from "../../modules/Layout";
import { CursorContext } from '../../providers/CursorProvider';
import { LinkPropsContext } from '../../providers/LinkPropsProvider';
import { MobileNavButtonContext } from '../../providers/MobileNavButtonProvider';
import { GET_CASES } from '../../queries/getcases';
import animateTextLine from '../../services/animateTextLine';
import { checkForScrollbar, getScrollbarWidth } from '../../services/scrollbarService';
import { getFooterData } from '../../utils/footer';
import { getHeaderData } from '../../utils/header';

export default function CaseStudiesPage({data, HeaderData, FooterData}) {
  const {width} = useWindowSize();
  const bannerRef = useRef(null);
  const headerRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  let { handleHover, handleLeave, handleHide } = useContext(CursorContext);
  let { linkProps, setLinkProps } = useContext(LinkPropsContext);
  let { mobileMenuShow, setMobileMenuShow } = useContext(MobileNavButtonContext);
  
  useEffect(() => {
    let scrollBarWidth = getScrollbarWidth();

    if ((mobileMenuShow || showPopup) && checkForScrollbar()) {
        document.body.style.paddingRight = scrollBarWidth + 'px';
        document.body.style.overflow = 'hidden';
        headerRef.current.style.paddingRight = scrollBarWidth + 'px';
    } else {
        document.body.style.overflow = null;
        document.body.style.paddingRight = null;
        headerRef.current.style.paddingRight = null;
    }
  }, [mobileMenuShow, showPopup])

  function togglePopup() {
    setShowPopup(state => !state);
  }


  // Case Studies
  const [mobile, setMobile] = useState(false);

  let textRef = useRef([]);

  function handleLinkClick(e) {
      
    let link = e.currentTarget;
    let links = document.querySelectorAll('[data-card]');

    links.forEach(otherLink => {
        if (otherLink !== link) {
            otherLink.style.opacity = '0';
        }
    })
    let image = link.querySelector('[data-image]');
    let coords = image.getBoundingClientRect();
    setLinkProps({
        left: coords.left,
        top: coords.top - (document.getElementById('header').clientHeight),
        width: coords.width,
        height: coords.height,
    });

    document.body.classList.add('no-scroll');
  }

  function checkMobile() {
      if (width < 480) {
          setMobile(true);
      } else {
          setMobile(false);
      }
  }

  useEffect(() => {
    if (process.browser) window.scrollTo(0, 0);
    animateTextLine(textRef.current);

    checkMobile();

    process.browser ? window.addEventListener('resize', checkMobile) : null;

    return () => {
      process.browser ? window.removeEventListener('resize', checkMobile) : null;
    }
  }, []);
  // Case Studies

  const {caseStudies, pageBy} = data

  return (
    <Layout seo={pageBy?.seo} HeaderData={HeaderData} FooterData={FooterData} bannerRef={bannerRef} headerRef={headerRef} handleLeave={handleLeave} handleHover={handleHover} handleHide={handleHide} togglePopup={togglePopup} showPopup={showPopup} mainClass="main case-studies">
        <ParallaxBanner
            className="banner--small"
            title={pageBy?.title}
            animateTitle={true}
            video={pageBy?.pagecase?.casepageHero?.video}
            backgroundImage={pageBy?.pagecase?.casepageHero?.backgroundImage}
            percent={50}
            headerRef={headerRef}
            immediateStart={true}
        />
        <div className="case-studies__wrapper">
            <CustomParticles modificator="case-studies" />
            <div className="case-studies__wrapper-container container" id="banner-slide-wrapper">
                <SideText modificator="case-studies" wrapper="banner-slide-wrapper">{pageBy?.pagecase?.sectionText}</SideText>
                {!mobile ?
                    <div className="line-text case-studies__line-text">
                        {
                           pageBy?.pagecase?.heroBottom?.desktop?.map((item, index) => {
                               return(
                                    <div key={index} className="line-text__row" ref={el => textRef.current.push(el)}>{item?.text}</div>
                               )
                           }) 
                        }
                    </div> :
                    <div className="line-text case-studies__line-text">
                        {
                           pageBy?.pagecase?.heroBottom?.mobile?.map((item, index) => {
                               return(
                                    <div key={index} className="line-text__row" ref={el => textRef.current.push(el)}>{item?.text}</div>
                               )
                           }) 
                        }
                    </div>}
                <ul className="case-studies__cards">
                    {
                        caseStudies?.nodes?.map((item, index) => {
                            return(
                                <li key={index} className="case-studies__cards-item">
                                    <SlideIn className="card card--case-v2" setXPercent={-100}>
                                        <Link href={item?.uri}>
                                            <a className="card__link" onMouseOver={handleHide} onMouseMove={moveImages} onMouseLeave={(e) => {
                                            resetAnimation(e);
                                            handleLeave();
                                            }} onClick={handleLinkClick} data-card>
                                                <div className="card__image-wrapper">
                                                    <div className="card__image" style={{ backgroundImage: `url(${ item?.featuredImage?.node?.sourceUrl ||img1.src})` }} data-image></div>
                                                </div>
                                                <p className="card__category">{item?.terms?.nodes[0]?.name}</p>
                                                <h3 className="card__title" data-title>
                                                    <span className="card__title-text">{item?.title}</span>
                                                </h3>
                                            </a>
                                        </Link>
                                    </SlideIn>
                                </li>
                            )
                        })
                    }

                </ul>
            </div>
        </div>
    </Layout>
  )
}

export async function getStaticProps( context ) {
    const HeaderData = await getHeaderData();
    const FooterData = await getFooterData();

	const { data, errors } = await client.query( {
		query: GET_CASES
	});

	return {
        props: {
			data: data || {},
            HeaderData,
            FooterData
		},
		revalidate: 60,
    };
}

function moveImages(e) {

  const { offsetX, offsetY, target } = e.nativeEvent;
  const { clientWidth, clientHeight } = target;
  const xPos = (offsetX / clientWidth) - 0.5;
  const yPos = (offsetY / clientHeight) - 0.5;

  let image = e.currentTarget.querySelector('[data-image]');
  let title = e.currentTarget.querySelector('[data-title]');

  gsap.to(image, {
      x: 10 * xPos,
      y: 10 * yPos,
      ease: 'power1.out'
  });

  gsap.to(image, {
      scale: 1.05,
      ease: 'power1.inOut'
  });

  gsap.to(title, {
      x: -5 * xPos,
      y: -8 * yPos,
      ease: 'power1.out'
  });
}

function resetAnimation(e) {
  let image = e.currentTarget.querySelector('[data-image]');
  let title = e.currentTarget.querySelector('[data-title]');

  gsap.to(image, {
      x: 0,
      y: 0,
      scale: 1
  });

  gsap.to(title, {
      x: 0,
      y: 0,
  });
}