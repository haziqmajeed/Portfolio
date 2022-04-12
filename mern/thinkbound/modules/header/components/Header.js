import useWindowSize from '@charlietango/use-window-size';
import gsap from 'gsap';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from '../../../common/Button';
import { DelayLink } from '../../../common/DelayLink';
import thinkboungLogo from '../../../icons/thinkbound.png';
import logoD from '../../../images/logo/logo.png';
import Dropdown from './../../../common/Dropdown';
import Burger from './../../../common/icons/Burger';
import addToRefs from '../../../services/addToRefs';
import NavList from '../../../common/NavList';
const RelativeLink = (url) => {
    //console.log(label);
    if (!url) return undefined
  
    let WPURL = process.env.NEXT_PUBLIC_WORDPRESS_SITE_URL
    let string = url
  
    if (string.startsWith(`/`)) return string
  
    if (string.match(WPURL)) {
      string = string.replace(WPURL, "")
      return string
    }
    return string
}

export default function Header({ HeaderData, mobileMenuShow, setMobileMenuShow, togglePopup, handleHover, handleLeave, headerRef }) {
    const {width} = useWindowSize();
    let mobileScreen = width < 990;
    const [mobileButtonShow, setMobileButtonShow] = useState(false);
    const [dropdownOpened, setDropdownOpened] = useState(false);
    const [submenuOpened, setSubmenuOpened] = useState(false);
    const [mobileMenuTl, setMobileMenuTl] = useState(null);

    const router = useRouter()
    const { pathname } = router;
    const currentPage = pathname.split('/')[1];


    const menu = useRef(null);
    const links = useRef([]);
    const dropdown = useRef(null);
    const submenu = useRef(null);

    function handleMobileButtonShow() {
        if (width < 990) {
            setMobileButtonShow(true);
        } else {
            setMobileButtonShow(false);
        }
    }

    let playMobileMenuTimeline = useCallback(() => {
        if (mobileMenuShow) {
            mobileMenuTl.timeScale(1.3);
            mobileMenuTl.reverse();
        } else {
            setMobileMenuShow(true);
            mobileMenuTl.timeScale(1);
            mobileMenuTl.play();
        }
    }, [mobileMenuShow, mobileMenuTl, setMobileMenuShow]);

    let toggleDropdown = useCallback(() => {
        setDropdownOpened((state) => !state);

        gsap.to(dropdown.current, {
            duration: 0.4,
            height: dropdownOpened ? 0 : 'auto',
            ease: 'power1.out'
        });
    }, [dropdownOpened]);

    let toggleSubmenu = useCallback(() => {
        setSubmenuOpened((state) => !state);

        gsap.to(submenu.current, {
            duration: 0.4,
            height: submenuOpened ? 0 : 'auto',
            ease: 'power1.out'
        });
    }, [submenuOpened]);

    let onMobileMenuClick = useCallback(() => {
        if (dropdownOpened) {
            toggleDropdown();
        }
        if (submenuOpened) {
            toggleSubmenu();
        }
        playMobileMenuTimeline();
    }, [submenuOpened, dropdownOpened, playMobileMenuTimeline, toggleDropdown, toggleSubmenu]);

    useEffect(() => {

        if (mobileScreen && !mobileMenuTl) {
            setMobileMenuTl(initMobileMenuTl(links.current, menu.current, mobileMenuShow, setMobileMenuShow));
        }

        handleMobileButtonShow();
        window.addEventListener('resize', handleMobileButtonShow);
        return () => {
            window.removeEventListener('resize', handleMobileButtonShow);
        };
    }, [mobileScreen, mobileMenuShow, mobileMenuTl, setMobileMenuShow, onMobileMenuClick]);

    const flatListToHierarchical = (
		data = [],
		{ idKey = 'id', parentKey = 'parentId', childrenKey = 'children' } = {}
	) => {
		const tree = [];
		const childrenOf = {};
		data.forEach(item => {
			const newItem = { ...item };
			const { [idKey]: id, [parentKey]: parentId = 0 } = newItem;
			childrenOf[id] = childrenOf[id] || [];
			newItem[childrenKey] = childrenOf[id];
			parentId
				? (childrenOf[parentId] = childrenOf[parentId] || []).push(newItem)
				: tree.push(newItem);
		});
		return tree;
	};
	const primaryMenu = flatListToHierarchical(HeaderData?.menus?.nodes[0]?.menuItems?.nodes);

    console.log('menu', primaryMenu)

    return (
        <header className={"header" + (currentPage ? "" : " header--main")} ref={headerRef} id="header">
            <div className="header__wrapper container container--header">
                <DelayLink to="/" className="logo" onMouseOver={handleHover} onMouseLeave={handleLeave}>
                    <div className="logo__image">
                        <Image src={HeaderData?.getHeader?.siteLogoUrl || logoD} alt="Logo" width={371} height={82} />
                    </div>
                </DelayLink>
                <div className={"header__menu" + (mobileMenuShow ? " opened" : "")} ref={menu}>
                    <div className="header__menu-wrapper">
                        <ul className="header__menu-list">
                            {primaryMenu.map(item => {
                                return (
                                    // <li className={`${item.parentId ? 'dropdown__item' : 'header__menu-item'}`}>
                                    //     <div className="header__menu-item-wrapper" ref={el => addToRefs(el, links)}>
                                             <NavList item={item} key={item.id} currentPage={currentPage} handleHover={handleHover} handleLeave={handleLeave} newRef={el => addToRefs(el, links)}/>
                                    //     </div>
                                    // </li>
                                    
                                );
                            })}
                        </ul>
                    </div>
                </div>
                <Button type='button' icon={thinkboungLogo} className="header__button" text="Start Project" onClick={togglePopup} />
                {mobileButtonShow ?
                    <button className={"header__mobile-button" + (mobileMenuShow ? " opened" : "")} onClick={onMobileMenuClick}>
                        <Burger className="header__mobile-icon" />
                    </button> : null}
            </div>
        </header>
    )
}

function addLinkClass(e) {
    e.target.classList.add('animate-out');
}

function removeLinkClass(e) {
    e.target.classList.remove('animate-out');
}

function initMobileMenuTl(menuLinks, menu, mobileMenuShow, setMobileMenuShow) {
    gsap.set(menuLinks, {
        yPercent: 100
    })

    let tl = gsap.timeline({
        defaults: {
            ease: 'Power4.out'
        },
        paused: true,
        onReverseComplete: () => {
            setMobileMenuShow(false);
        }
    })
        .to(menu, {
            height: '100vh',
            display:'table'
        })
        .add(
            gsap.timeline({
                defaults: {
                    stagger: 0.1
                }
            })
                .to(menuLinks, {
                    yPercent: -25,
                    ease: 'power3.out',
                    duration: 0.4
                }, 0)
                .to(menuLinks, {
                    yPercent: 0,
                    duration: 0.3,
                    ease: !mobileMenuShow ? 'power1.in' : 'power1.out',
                }, 0.2)
        )

    return tl;
}