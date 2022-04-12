import useWindowSize from '@charlietango/use-window-size';
import { motion } from 'framer-motion';
import { isEmpty } from 'lodash';
import React, { useContext, useEffect, useRef, useState } from "react";
import { FacebookShareButton, LinkedinShareButton, PinterestShareButton, TwitterShareButton } from "react-share";
import client from "../../apollo/client";
import { DelayLink } from '../../common/DelayLink';
import Arrow from '../../common/icons/Arrow';
import Facebook from '../../common/icons/Facebook';
import LinkedIn from '../../common/icons/LinkedIn';
import Pinterest from '../../common/icons/Pinterest';
import Share from '../../common/icons/Share';
import Twitter from '../../common/icons/Twitter';
import SideText from '../../common/SideText';
import Layout from "../../modules/Layout";
import { CursorContext } from '../../providers/CursorProvider';
import { LinkPropsContext } from '../../providers/LinkPropsProvider';
import { MobileNavButtonContext } from '../../providers/MobileNavButtonProvider';
import { GET_POST, GET_POSTS_URI } from '../../queries/getposts';
import parallaxAnimation from '../../services/parallaxAnimation';
import { checkForScrollbar, getScrollbarWidth } from '../../services/scrollbarService';
import { getFooterData } from '../../utils/footer';
import { getHeaderData } from '../../utils/header';
import Link from 'next/link';
import SlideIn from '../../common/SlideIn';
let transition = { duration: 0.2, ease: [0.43, 0.13, 0.23, 0.96] };

const SiteURL = process.env.NEXT_PUBLIC_NEXTJS_SITE_URL

function SingleBlogsPage({data, HeaderData, FooterData}) {

    console.log("hello")
  const {width} = useWindowSize();
  const bannerRef = useRef(null);
  const headerRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  let { handleHover, handleLeave, handleHide } = useContext(CursorContext);
  let { linkProps, setLinkProps } = useContext(LinkPropsContext);
  let { mobileMenuShow, setMobileMenuShow } = useContext(MobileNavButtonContext);
//   const [test, setTest] = useState(true);

//   useEffect(() => {
//     setTest(true);
//   }, []);


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

    // single blog //
    let leftLinkRef = useRef(null);
    let rightLinkRef = useRef(null);
    let banner = useRef(null);
    let bannerImage = useRef(null);

    function handleLinkClick(e) {
      
        let link = e.currentTarget;
        let links = document.querySelectorAll('[data-card]');
     console.log("links",links)
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
    
        // document.body.classList.add('no-scroll');
      }


    useEffect(() => {
   
        if (process.browser) window.scrollTo(0, 0);

        document.body.classList.remove('no-scroll');
        
        parallaxAnimation(bannerImage.current, 20, width < 768 ? "top top" : "center center", banner.current);
    }, [width])
    // end //
    console.log("linkProps",linkProps)


  return (
    <Layout key={data?.post?.title}  seo={data?.post?.seo} HeaderData={HeaderData} FooterData={FooterData} bannerRef={bannerRef} headerRef={headerRef} handleLeave={handleLeave} handleHover={handleHover} handleHide={handleHide} togglePopup={togglePopup} showPopup={showPopup} mainClass="main blog">
        <motion.main initial='initial' animate='animate' exit='exit'>
            <div className="blog__banner" ref={banner}>
                <motion.div
                    initial={{
                        borderRadius: '5px',
                        ...linkProps,
                    }}
                    //style={data?.post?.title ? {width: '50%',height:'50%' } : { width: '50%',height:'50%' }}
                    exit={{ opacity: 0 }}
                    animate={{
                        width: '100%',
                        height: '100%',
                        transition: { delay: 0.1, duration: 0.75, transition },
                        left: 0,
                        top: 0,
                        borderRadius: 0,
                    }}
                    className="blog__banner-image-wrapper"
                >
                    <div style={{ backgroundImage: `url(${data?.post?.featuredImage?.node?.sourceUrl})` }} className="blog__banner-image" ref={bannerImage} />
                </motion.div>
                <div className="blog__banner-wrapper container">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        className="blog__banner-title" id="banner-title">{data?.post?.title}</motion.div>
                </div>
            </div>
            <div className="blog__wrapper container container--blog" id="blog-wrapper">
                <SideText modificator="blog" wrapper="blog-wrapper">our thoughts</SideText>
                <motion.div transition={{ duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] }} animate={{ opacity: 1 }} className="blog__content">
                    <h1 className="blog__title">{data?.post?.title}</h1>
                    <div dangerouslySetInnerHTML={{__html: data?.post?.content}} />
                </motion.div>
                <div className="blog__share">
                    <div className="blog__share-wrapper">
                        <button className="blog__share-button blog__share-button--big" onMouseOver={handleHide} onMouseLeave={handleLeave}>
                            <Share className="blog__share-icon" />
                        </button>
                        <FacebookShareButton url={`${SiteURL}/blogs/${data?.post?.uri}`} className="blog__share-button blog__share-button--small blog__share-button--1" onMouseOver={handleHide} onMouseLeave={handleLeave}>
                            <Facebook className="blog__share-icon" />
                        </FacebookShareButton>
                        <TwitterShareButton url={`${SiteURL}/blogs/${data?.post?.uri}`} className="blog__share-button blog__share-button--small blog__share-button--2" onMouseOver={handleHide} onMouseLeave={handleLeave}>
                            <Twitter className="blog__share-icon" />
                        </TwitterShareButton>
                        <LinkedinShareButton url={`${SiteURL}/blogs/${data?.post?.uri}`} className="blog__share-button blog__share-button--small blog__share-button--3" onMouseOver={handleHide} onMouseLeave={handleLeave}>
                            <LinkedIn className="blog__share-icon" />
                        </LinkedinShareButton>
                        <PinterestShareButton url={`${SiteURL}/blogs/${data?.post?.uri}`} className="blog__share-button blog__share-button--small blog__share-button--4" onMouseOver={handleHide} onMouseLeave={handleLeave}>
                            <Pinterest className="blog__share-icon" />
                        </PinterestShareButton>
                    </div>
                </div>
                {/* <SlideIn className="card card--blog" setXPercent={-100} opacity={1}>
                                        <Link href={`/blogs${post?.uri}`}>
                                            <a className="card__link" onClick={handleLinkClick} onMouseOver={handleHover} onMouseLeave={handleLeave}>
                                            <div className="card__image-wrapper" style={{ backgroundImage: `url(${post?.featuredImage?.node?.sourceUrl})` }} data-image />
                                            <motion.div exit={{ opacity: 0 }} transition={transition} className="card__column">
                                                <h4 className="card__name">News</h4>
                                                <h1 className="card__title">{post.title}</h1>
                                                <Date date={post.date} />
                                                <p className="card__text" dangerouslySetInnerHTML={{__html: post?.excerpt}} />
                                            </motion.div>
                                            </a>
                                        </Link>
                                    </SlideIn> */}
                <div className="blog__nav" key={data?.post?.title}>
                    {
                        data?.post?.previous && (
                            <SlideIn className="card card--blog" setXPercent={-100} opacity={1} >
                                <Link href={`/blogs${data?.post?.previous?.uri}`} 
                                className="blog__nav-button"
                                ref={leftLinkRef}                           
                                onMouseOver={handleHover}
                                onMouseLeave={handleLeave}
                                >
                                    <a className="card__link blog__nav-button--prev" style={{padding:"0px"}} onClick={handleLinkClick} data-card>
                                           
                                    <motion.div
                                        className="blog__nav-button-wrapper"
                                        
                                        style={{ backgroundImage: `url(${data?.post?.previous?.featuredImage?.node?.sourceUrl})` }}
                                        exit={() => {
                                            let leftLink = leftLinkRef.current;
                                            return leftLink.classList.contains('active') ? { opacity: 1 } : { opacity: 0 }
                                        }}
                                        animate={{ opacity: 1 }} transition={{ duration: 0.2, ...transition }}
                                        data-image
                                    >
                                        <motion.h4 exit={{ opacity: 0 }} transition={{ duration: 0.2, ...transition }} className="blog__nav-title">
                                            <Arrow className="blog__nav-icon" />
                                            <span className="blog__nav-title-text">Previous Post</span>
                                        </motion.h4>
                                        <motion.p exit={{ opacity: 0 }} transition={{ duration: 0.2, ...transition }} className="blog__nav-text">{data?.post?.previous?.title}</motion.p>
                                    </motion.div>
                                    </a>
                                </Link>
                            </SlideIn>
                        )
                    }
                    {
                        data?.post?.next && (
                        <SlideIn className="card card--blog" setXPercent={-100} opacity={1}>
                            <Link href={`/blogs${data?.post?.next?.uri}`}
                            className="blog__nav-button"
                            ref={rightLinkRef}
                            onMouseOver={handleHover} onMouseLeave={handleLeave}
                            >
                                <a className="card__link" style={{padding:"0px"}} onClick={handleLinkClick} data-card>
                                <motion.div
                                    className="blog__nav-button-wrapper"
                                    style={{ backgroundImage: `url(${data?.post?.previous?.featuredImage?.node?.sourceUrl})` }}
                                    exit={() => {
                                        let rightLink = rightLinkRef.current;
                                        return rightLink.classList.contains('active') ? { opacity: 1 } : { opacity: 0 }
                                    }}
                                    animate={{ opacity: 1 }} transition={{ duration: 0.2, ...transition }}
                                    data-image
                                >
                                    <motion.h4 exit={{ opacity: 0 }} className="blog__nav-title">
                                        <span className="blog__nav-title-text">Next Post</span>
                                        <Arrow className="blog__nav-icon" />
                                    </motion.h4>
                                    <motion.p exit={{ opacity: 0 }} transition={{ duration: 0.2, ...transition }} className="blog__nav-text">{data?.post?.next?.title}</motion.p>
                                </motion.div>
                                </a>
                            </Link>
                        </SlideIn>
                        )
                    }
                </div>
            </div>
        </motion.main>
    </Layout>
  )
}

export default SingleBlogsPage

export async function getStaticProps( {params} ) {
    const HeaderData = await getHeaderData();
    const FooterData = await getFooterData();
	const {data, errors} = await client.query( {
		query: GET_POST,
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
		query: GET_POSTS_URI
	} );

	const pathsData = [];

	data?.pages?.nodes && data?.pages?.nodes.map( page => {
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