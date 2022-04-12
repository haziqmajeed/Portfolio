import { motion } from 'framer-motion';
import { gsap } from 'gsap/gsap-core';
import Link from 'next/link';
import React, { useContext, useEffect, useRef, useState } from "react";
import ReactPaginate from 'react-paginate';
import CustomParticles from '../../common/CustomParticles/CustomParticles';
import Date from '../../common/Date';
import SideText from '../../common/SideText';
import SlideIn from '../../common/SlideIn';
import Layout from "../../modules/Layout";
import { CursorContext } from '../../providers/CursorProvider';
import { LinkPropsContext } from '../../providers/LinkPropsProvider';
import { MobileNavButtonContext } from '../../providers/MobileNavButtonProvider';
import { checkForScrollbar, getScrollbarWidth } from '../../services/scrollbarService';
import { getFooterData } from '../../utils/footer';
import { getHeaderData } from '../../utils/header';
import { getPaginatedPosts } from '../../utils/posts';

let transition = { duration: 0.2, ease: [0.43, 0.13, 0.23, 0.96] };

const postsPerPage = process.env.NEXT_PUBLIC_POSTS_PER_PAGE

function BlogsPage(props) {
  const {pagination, posts} = props;
  const bannerRef = useRef(null);
  const headerRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false);
  let { handleHover, handleLeave, handleHide } = useContext(CursorContext);
  let { linkProps, setLinkProps } = useContext(LinkPropsContext);
  let textRefs = useRef([]);
  let { mobileMenuShow, setMobileMenuShow } = useContext(MobileNavButtonContext);

  const [isLoading, setLoading] = useState(false); //State for the loading indicator
  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);


  console.log('pagi post data', props)
    useEffect(() => {
        if (process.browser) window.scrollTo(0, 0);
        let textElements = textRefs.current;

        gsap.timeline({
            defaults: {
                duration: 1,
            },
            scrollTrigger: {
                trigger: textElements[1],
                start: "top center",
                onEnter: () => animateTextLine(textElements)
            }
        });
    }, [])


    useEffect(() => {
        // Fetch items from another resources.
        const endOffset = itemOffset + 2;
        //console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setCurrentItems(posts.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(posts.length / 2));
    }, [itemOffset, posts]);
    
    const handlePageClick = (event) => {
        const newOffset = (event.selected * 2) % posts.length;
        //console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
        setItemOffset(newOffset);
    };
        

    function handleLinkClick(e) {
        let link = e.currentTarget;
        let links = document.querySelectorAll('[data-blog-card]');
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

  return (
    <Layout seo={props?.pageBy?.seo} HeaderData={props?.HeaderData} FooterData={props?.FooterData} bannerRef={bannerRef} headerRef={headerRef} handleLeave={handleLeave} handleHover={handleHover} handleHide={handleHide} togglePopup={togglePopup} showPopup={showPopup} mainClass="main">
        <motion.main className="" initial='initial' animate='animate' exit='exit'>
            <div className="blogs">
                <CustomParticles modificator="blogs" />
                <div className="blogs__wrapper container" id="blogs-wrapper">
                    <SideText modificator="blogs" wrapper="blogs-wrapper">{props?.pageBy?.pageblog?.sectionText}</SideText>
                    <div className="blogs__title">{props?.pageBy?.title}</div>
                    {
                       props?.pageBy?.pageblog?.lineText && (
                        <div className="line-text blogs__line-text">
                            {
                                props?.pageBy?.pageblog?.lineText?.map((item, index) => {
                                    return(
                                        <div key={index} className="line-text__row" ref={el => textRefs.current.push(el)}>{item?.text}</div>
                                    )
                                })
                            }
                        </div>
                       ) 
                    }
                    <ul className="blogs__list">
                        { currentItems?.map((post, index) => {
                            return (
                                <li className="blogs__item" key={index}>
                                    <SlideIn className="card card--blog" setXPercent={-100} opacity={1}>
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
                                    </SlideIn>
                                </li>
                            );
                        })}
                    </ul>
                    <ReactPaginate
                        previousLabel={'previous'}
                        nextLabel={'next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        activeClassName={'active'}
                        containerClassName={'paginator blogs__paginator'}
                        pageClassName={'paginator__item'}
                        pageLinkClassName={'paginator__link'}
                        previousLinkClassName={'paginator__link paginator__link--prev'}
                        nextLinkClassName={'paginator__link paginator__link--next'}
        
                        initialPage={props.pagination.currentPage - 1}
                        pageCount={props.pagination.pagesCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                    />
                </div>
            </div>
        </motion.main>
    </Layout>
  )
}
export default BlogsPage

export async function getStaticProps() {
    const HeaderData = await getHeaderData();
    const FooterData = await getFooterData();
    const { posts, pageBy, pagination } = await getPaginatedPosts();

    return {
      props: {
        posts,
        pageBy,
        HeaderData,
        FooterData,
        pagination: {
          ...pagination
        },
      },
    };
}


function animateTextLine(textElements) {

    return gsap.timeline({
        defaults: {
            duration: 1,
            ease: 'power4.out'
        }
    })
        .set(textElements, {
            className: 'line-text__row animation-out',
            stagger: 0.5,
            ease: 'Power4.out'
        }, 0)
}