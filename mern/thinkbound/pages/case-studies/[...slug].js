import useWindowSize from '@charlietango/use-window-size';
import { motion } from 'framer-motion';
import { gsap } from 'gsap/gsap-core';
import { isEmpty } from 'lodash';
import Image from 'next/image';
import React, { useContext, useEffect, useRef, useState } from "react";
import client from "../../apollo/client";
import CustomParticles from '../../common/CustomParticles/CustomParticles';
import { DelayLink } from '../../common/DelayLink';
import FixedNavSections from '../../common/FixedNavSections/FixedNavSections';
import Arrow from '../../common/icons/Arrow';
import LadderText from '../../common/LadderText';
import ParallaxBanner from '../../common/ParallaxBanner';
import SideText from '../../common/SideText';
import SlideIn from '../../common/SlideIn';
import bg3 from '../../images/case-study/bg3.png';
import cmc from '../../images/case-study/cmc.png';
import Layout from "../../modules/Layout";
import { CursorContext } from '../../providers/CursorProvider';
import { LinkPropsContext } from '../../providers/LinkPropsProvider';
import { MobileNavButtonContext } from '../../providers/MobileNavButtonProvider';
import { GET_CASE, GET_CASES_URI } from '../../queries/getcases';
import { checkForScrollbar, getScrollbarWidth } from '../../services/scrollbarService';
import { getFooterData } from '../../utils/footer';
import { getHeaderData } from '../../utils/header';

let transition = { duration: 0.2, ease: [0.43, 0.13, 0.23, 0.96] };

export default function SingleBlogsPage({data, HeaderData, FooterData}) {
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

    // single Case //
    let ladderText = useRef([]);
    const [mobileScreen, setMobileScreen] = useState(false);

    function checkForMobileScreen() {
        if (width < 768) {
            setMobileScreen(true);
        } else {
            setMobileScreen(false);
        }
    }

    useEffect(() => {
        if (process.browser) window.scrollTo(0, 0);
        checkForMobileScreen();
        document.body.classList.remove('no-scroll');
        let tl = initLadderAnimation(ladderText.current);
        if (process.browser) window.addEventListener('resize', checkForMobileScreen);

        return () => {
            tl.kill();
            if (process.browser) window.removeEventListener('resize', checkForMobileScreen);
            
        }
    }, []);
    // end //

    const Sections = data?.caseStudieBy?.casesingle?.sections

    console.log('Case: ', data);
  return (
    <Layout seo={data?.caseStudieBy?.seo} HeaderData={HeaderData} FooterData={FooterData} bannerRef={bannerRef} headerRef={headerRef} handleLeave={handleLeave} handleHover={handleHover} handleHide={handleHide} togglePopup={togglePopup} showPopup={showPopup} mainClass="main case-study">

        <ParallaxBanner backgroundImage={data?.caseStudieBy?.featuredImage?.node} animateTitle={true} scrollDown={true} percent={50} id="top-banner" linkProps={linkProps} headerRef={headerRef} immediateStart={true} />

        <motion.main initial="initial" animate="animate" exit="exit">
            {Sections?.map((section, index) => {
            const typeName = section?.__typename || null

            switch (typeName) {

                case "CaseStudie_Casesingle_Sections_CasepageLeftContentRightList":
                return (
                    <div key={index} className="case-study__wrapper">
                        <CustomParticles modificator="case-studies" />
                        <div className="case-study__columns container" id="columns">
                            <SideText modificator="case-study" wrapper="columns" percent={10}>{section?.sectionText}</SideText>
                            <div className="case-study__column case-study__column--1" id="slide-wrapper">
                                <SlideIn className="case-study__title case-study__title--v1" trigger={mobileScreen ? "#top-banner" : "#slide-wrapper"} setYPercent={100} toYPercent={0}>{section?.title}</SlideIn>
                                <SlideIn className="case-study__text" trigger={mobileScreen ? "#top-banner" : "#slide-wrapper"} setYPercent={100} toYPercent={0}>
                                    <div dangerouslySetInnerHTML={{__html: section?.description}} />
                                </SlideIn>
                            </div>
                            <SlideIn className="case-study__column case-study__column--2" trigger={mobileScreen ? "#top-banner" : "#slide-wrapper"} setXPercent={100} toXPercent={0}>
                                <h3 className="case-study__title case-study__title--columns case-study__title--small">{section?.listTitle}</h3>
                                <ul className="case-study__work-list">
                                    {
                                        section?.list?.map((item, index) => {
                                            return <li key={index} className="case-study__work-item">{item?.text}</li>
                                        })
                                    }
                                </ul>
                            </SlideIn>
                        </div>
                    </div>
                )

                case "CaseStudie_Casesingle_Sections_CasepageFixednavsections":
                return <FixedNavSections key={index} {...section} className="case-study" headerRef={headerRef} />

                case "CaseStudie_Casesingle_Sections_CasepageResults":
                return (
                    <div key={index} className="case-study__result container" id="result">
                        <SideText modificator="result" wrapper="result" fullHeight={true}>{section?.sectionText}</SideText>
                        <ul className="case-study__list">
                            {
                                section?.results?.map((item, index) => {
                                    return(
                                        <li key={index} className="case-study__item">
                                            <div className="case-study__item-column case-study__item-column--1">
                                                <SlideIn setXPercent={100} toggleActions='restart pause reverse reset' opacity={1} className="case-study__item-image" style={{ backgroundImage: `url(${item?.image?.sourceUrl})` }} />
                                            </div>
                                            <div className="case-study__item-column case-study__item-column--2">
                                                <SlideIn setXPercent={-100} toggleActions='restart pause reverse reset' opacity={1} className="case-study__item-wrapper">
                                                    <h2 className="case-study__item-title">{item?.title}</h2>
                                                    <p className="case-study__item-text">
                                                        {item?.text}
                                                    </p>
                                                </SlideIn>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                )

                case "CaseStudie_Casesingle_Sections_CasepageFeedback":
                return (
                    <div key={index} className="case-study__feedback">
                        <div className="case-study__feedback-wrapper container" id="feedback-wrapper">
                            <SlideIn setYPercent={100} toXPercent={0} trigger="#feedback-wrapper" className="case-study__title case-study__title--feedback">{section?.title}</SlideIn>
                            <LadderText refs={ladderText} className="case-study__feedback-text" text={section?.text} />
                            <SlideIn setYPercent={100} toXPercent={0} trigger="#feedback-wrapper" className="case-study__feedback-user">{section.user}</SlideIn>
                            <SlideIn setYPercent={100} toXPercent={0} trigger="#feedback-wrapper" className="case-study__feedback-image">
                                <Image src={cmc} alt="" />
                            </SlideIn>
                        </div>
                    </div>
                )

                default:
                return ""
            }

            })}

            {
                data?.caseStudieBy?.previous && (
                    <DelayLink to={data?.caseStudieBy?.previous?.uri} 
                    className="banner banner--next"
                    onMouseOver={handleHover} 
                    onMouseLeave={handleLeave}
                    >
                        <div className="banner__image" style={{ backgroundImage: `url(${data?.caseStudieBy?.previous?.featuredImage?.node?.sourceUrl || bg3.src})` }} data-image></div>
                        <motion.div exit={{ opacity: 0 }} transition={transition} className="banner__wrapper container">
                            <h4 className="banner__title banner__title--big">Next Project</h4>
                            <h3 className="banner__title banner__title--small">{data?.caseStudieBy?.previous?.title}</h3>
                            <div className="banner__title banner__title--arrow">
                                <span className="banner__title-text">View Case study</span>
                                <Arrow className="banner__title-icon" />
                            </div>
                        </motion.div>
                    </DelayLink>
                )
            }

        </motion.main>
    </Layout>
  )
}

export async function getStaticProps( {params} ) {
    const HeaderData = await getHeaderData();
    const FooterData = await getFooterData();

	const {data, errors} = await client.query( {
		query: GET_CASE,
		variables: {
			uri: params?.slug.join( '/' ),
		},
	} );

	return {
        props: {
			data: data || {},
            HeaderData,
            FooterData,
            params: params
		},
		revalidate: 1,
    }
}

export async function getStaticPaths() {
	const {data} = await client.query( {
		query: GET_CASES_URI
	} );

	const pathsData = [];

	data?.caseStudies?.nodes && data?.caseStudies?.nodes.map( page => {
		if ( ! isEmpty( page?.uri ) ) {
			const slugs = page?.uri?.split( '/' ).filter( pageSlug => pageSlug );
			pathsData.push( {params: {slug: slugs}} );
		}
	} );

	return {
		paths: pathsData,
		fallback: true
	};
}

function initLadderAnimation(ladderTextElements) {
    return gsap.timeline({
        defaults: {
            delay: 0.2,
            duration: 0.4,
            ease: 'Power4.in'
        },
        onComplete: () => {
            document.querySelector('.case-study__feedback-text')?.classList.add('active');
        },
        scrollTrigger: {
            trigger: '#feedback-wrapper',
            start: 'top center',
        },
    }).from(ladderTextElements, {
        yPercent: 100,
        stagger: 0.1,
    })
}