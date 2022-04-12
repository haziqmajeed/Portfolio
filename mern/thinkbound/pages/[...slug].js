import { isEmpty } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from "react";
import client from "../apollo/client";
import Accordion from '../common/Accordion';
import Approach from '../common/Approach';
import Case from '../common/Case/components/Case';
import Feedback from '../common/Feedback';
import ParallaxBanner from '../common/ParallaxBanner';
import PhonesBanner from '../common/PhonesBanner';
import Spacer from '../common/Spacer';
import Testimonials from '../common/Testimonials/components/Testimonials';
import Clients from "../modules/about/components/Clients";
import Expertise from "../modules/about/components/Expertise";
import OurValues from "../modules/about/components/OurValues";
import OurVision from "../modules/about/components/OurVision";
import ContactInfo from '../modules/contact/components/ContactInfo';
import ContactMap from '../modules/contact/components/ContactMap';
import Layout from "../modules/Layout";
import BackgroundBanner from '../modules/main-page/components/backgroundBanner/BackgroundBanner';
import Banner from '../modules/main-page/components/banner/components/Banner';
import ImageAndParagraph from '../modules/main-page/components/imageAndParagraph/ImageAndParagraphs';
import Industry from '../modules/main-page/components/industry/components/Industry';
import News from '../modules/main-page/components/news/components/News';
import OurClient from '../modules/main-page/components/ourClient/OurClient';
import Reputation from '../modules/main-page/components/reputation/components/Reputation';
import Services from '../modules/main-page/components/services/components/Services';
import ServiceBanner from "../modules/service/components/ServiceBanner";
import ServiceContent from "../modules/service/components/ServiceContent";
import InnerpageLeftTextRightImageAndText from "../modules/service/components/Services";
import ServicesCard from "../modules/service/components/ServicesCard";
import { CursorContext } from '../providers/CursorProvider';
import { LinkPropsContext } from '../providers/LinkPropsProvider';
import { MobileNavButtonContext } from '../providers/MobileNavButtonProvider';
import { GET_PAGE, GET_PAGES_URI } from '../queries/getpage';
import { checkForScrollbar, getScrollbarWidth } from '../services/scrollbarService';
import { getFooterData } from '../utils/footer';
import { getHeaderData } from '../utils/header';
import { handleRedirectsAndReturnData, isCustomPageUri } from '../utils/slug';
const Dynamic = ({data, HeaderData, FooterData, params}) => {
	console.log("data",data);
	const bannerRef = useRef(null);
	const headerRef = useRef(null);
	let { setLinkProps } = useContext(LinkPropsContext);
	const [showPopup, setShowPopup] = useState(false);
	let { handleHover, handleLeave, handleHide } = useContext(CursorContext);
  let { mobileMenuShow, setMobileMenuShow } = useContext(MobileNavButtonContext);
  
	useEffect(() => {
	  if (process.browser) window.scrollTo(0, 0);
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
  
	const sections = data?.page?.pagesections?.sections
	const posts = data?.posts
  const caseStudies = data?.caseStudies?.nodes
  const approachs = data?.approachs?.nodes
  const testimonials = data?.testimonials?.nodes
  
    return (
	  <Layout seo={data?.page?.seo} HeaderData={HeaderData} FooterData={FooterData} uri={data?.page?.uri} bannerRef={bannerRef} headerRef={headerRef} handleLeave={handleLeave} handleHover={handleHover} handleHide={handleHide} togglePopup={togglePopup} showPopup={showPopup} mainClass="main">

        {sections?.map((section, index) => {
          const typeName = section.__typename
          console.log("typeName",typeName);

          switch (typeName) {
            case "Page_Pagesections_Sections_HomepageHero":
              return <Banner key={index} bannerRef={bannerRef} togglePopup={togglePopup} {...section} />
              
            case "Page_Pagesections_Sections_HomepageReputation":
              return <Reputation key={index} {...section} />

            case "Page_Pagesections_Sections_HomepageServices":
              return <Services key={index} {...section} />

            case "Page_Pagesections_Sections_HomepageAboutUs":
              return <PhonesBanner key={index} {...section} />

            case "Page_Pagesections_Sections_HomepageIndustries":
              return <Industry key={index} {...section} />

            case "Page_Pagesections_Sections_HomepageApproach":
              return <Approach key={index} approachs={approachs} {...section} />

            case "Page_Pagesections_Sections_CaseStudies":
              return <Case key={index} {...section} caseStudies={caseStudies} index={index} />

            case "Page_Pagesections_Sections_SectionTestimonials":
              return <Testimonials key={index} index={index} {...section} testimonials={testimonials} togglePopup={togglePopup}  />

            case "Page_Pagesections_Sections_PostsSection":
              return <News key={index} {...section} index={index} posts={posts} setLinkProps={setLinkProps} handleHover={handleHover} handleLeave={handleLeave} />

            case "Page_Pagesections_Sections_InnerpageHeroVideoBg":
              return <ParallaxBanner key={index} {...section} animateTitle={true} className="banner--small" percent={50} headerRef={headerRef} upperTitle="Creative studio design" scalePercent={1.3} immediateStart={true} />

            case "Page_Pagesections_Sections_InnerpageOurvision":
              return <OurVision key={index} {...section} />

            case "Page_Pagesections_Sections_InnerpageOurvalues":
              return <OurValues key={index} {...section} />

            case "Page_Pagesections_Sections_InnerpageExpertise":
              return <Expertise key={index} {...section} index={index} headerRef={headerRef} />

            case "Page_Pagesections_Sections_InnerpageClients":
              return <Clients key={index} {...section} handleLeave={handleLeave} handleHover={handleHover} />

            case "Page_Pagesections_Sections_ContactpageInfo":
              return <ContactInfo key={index} {...section} />

            case "Page_Pagesections_Sections_ContactpageMap":
              return <ContactMap key={index} {...section} />

            case "Page_Pagesections_Sections_InnerpageHeroWithForm":
              return <ServiceBanner key={index} {...section} />

            case "Page_Pagesections_Sections_InnerpageLeftTextRightImageAndText":
              return <InnerpageLeftTextRightImageAndText key={index} {...section} />

            case "Page_Pagesections_Sections_InnerpageServicescard":
              return <ServicesCard key={index} {...section} />

            case "Page_Pagesections_Sections_InnerpageCallToAction":
              return <Feedback key={index} {...section} togglePopup={togglePopup} />

            case "Page_Pagesections_Sections_InnerpageContentWithTopRightImage":
              return <ServiceContent key={index} {...section} />

            case "Page_Pagesections_Sections_SectionAccordion":
              return <Accordion key={index} {...section} />

            case "Page_Pagesections_Sections_SectionSpacer":
              return <Spacer key={index} {...section} />

            case "Page_Pagesections_Sections_ImageAndParagraph":
              return <ImageAndParagraph key={index} {...section}/>

            case "Page_Pagesections_Sections_InnerpageClients":
              return <Clients key={index} {...section} handleLeave={handleLeave} handleHover={handleHover} />

            case "Page_Pagesections_Sections_HomepageAboutUs":
              return <PhonesBanner key={index} {...section} />

            default:
              return ""
          }

        })}

    </Layout>
    )
}

export default Dynamic

export async function getStaticProps( {params} ) {
  const HeaderData = await getHeaderData();
  const FooterData = await getFooterData();

	const {data, errors} = await client.query( {
		query: GET_PAGE,
		variables: {
			uri: params?.slug.join( '/' ),
		},
	} );

	const defaultProps = {
		props: {
			data: data || {},
      HeaderData,
      FooterData,
      params: params
		},
		revalidate: 1,
	};

	return handleRedirectsAndReturnData( defaultProps, data, errors, 'page' );
}

export async function getStaticPaths() {
	const {data} = await client.query( {
		query: GET_PAGES_URI
	} );

  console.log('uri check', JSON.stringify(data))

	const pathsData = [];

	data?.pages?.nodes && data?.pages?.nodes.map( page => {
		if ( ! isEmpty( page?.uri ) && ! isCustomPageUri( page?.uri ) ) {
			const slugs = page?.uri?.split( '/' ).filter( pageSlug => pageSlug );
			pathsData.push( {params: {slug: slugs}} );
		}
	} );

	return {
		paths: pathsData,
		fallback: true
	};
}