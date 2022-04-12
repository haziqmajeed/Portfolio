import useWindowSize from '@charlietango/use-window-size';
import gsap from 'gsap';
import React, { useCallback, useRef, useState } from "react";
import { DelayLink } from './DelayLink';
import Link from 'next/link';

const RelativeLink = (url) => {
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

const NavList = ({item, currentPage, handleHover, handleLeave , newRef}) => {
    const {width} = useWindowSize();
  console.log("newRef",newRef)
    let mobileScreen = width < 990;
    const { children = [] } = item
    const isExpandable = children && children.length > 0
    const [dropdownOpened, setDropdownOpened] = useState(false);
    const dropdown = useRef(null);

    let toggleDropdown = useCallback(() => {
      setDropdownOpened(state => !state);
      
      gsap.to(dropdown.current, {
          duration: 0.4,
          height: dropdownOpened ? 0 : 'auto',
          paddingTop: dropdownOpened ? 0 : '15px',
          ease: 'power1.out'
      });
    }, [dropdownOpened]);

    const MenuItemChildren = (
      <div className="dropdown dropdown--header" ref={dropdown}>
        <div className="dropdown__wrapper">
          <ul className="dropdown__list">
              {children.map((item, index) => (
                <NavList item={item} key={`sub-nav-${index}`} />
              ))}
          </ul>
        </div>
      </div>
    )
    //dropdown-toggle
    const MenuItemRoot = isExpandable ? (
      <li className={`${item.parentId ? 'dropdown__item' : 'header__menu-item'}`} 
        onMouseEnter={!mobileScreen ? toggleDropdown : () => false}
        onMouseLeave={!mobileScreen ? toggleDropdown : () => false}
      >
            <div className="header__menu-item-wrapper" ref={newRef}>
                {width < 990 ? <Link
                    href={RelativeLink(item?.url)}
                    className={`${item.parentId ? 'dropdown__link' : 'header__menu-link'} ${(RelativeLink(item?.url) === '/' + currentPage) ? 'active' : ''}`}
                    onMouseOver={handleHover}
                    handleLeave={handleLeave}
                    onMouseLeave={(e) => addLinkClass(e)}
                    onTransitionEnd={removeLinkClass}
                >
                    <a className={`${item.parentId ? 'dropdown__link' : 'header__menu-link'} ${(RelativeLink(item?.url) === '/' + currentPage) ? 'active' : ''}`}>{item.label}</a>
                </Link> : <DelayLink
                    to={RelativeLink(item?.url)}
                    className={`${item.parentId ? 'dropdown__link' : 'header__menu-link'} ${(RelativeLink(item?.url) === '/' + currentPage) ? 'active' : ''}`}
                    onMouseOver={handleHover}
                    handleLeave={handleLeave}
                    onMouseLeave={(e) => addLinkClass(e)}
                    onTransitionEnd={removeLinkClass}
                >
                    {item.label}
                </DelayLink>}
                <button className={"open open--header" + (dropdownOpened ? " active" : "")} onClick={toggleDropdown}></button>
                {MenuItemChildren}
            </div>
      </li>
    ): (
        <li className={`${item.parentId ? 'dropdown__item' : 'header__menu-item'}`}>
            <div className="header__menu-item-wrapper" ref={newRef}>
            {width < 990 ? <Link
                    href={RelativeLink(item?.url)}
                    className="test"
                    onMouseOver={handleHover}
                    onMouseLeave={(e) => addLinkClass(e)}
                    onTransitionEnd={removeLinkClass}          
                >
                    <a className={`${item.parentId ? 'dropdown__link' : 'header__menu-link'} ${(RelativeLink(item?.url) === '/' + currentPage) ? 'active' : ''}`}>{item.label}</a>
                </Link> : <DelayLink
                    to={RelativeLink(item?.url)}
                    className={`${item.parentId ? 'dropdown__link' : 'header__menu-link'} ${(RelativeLink(item?.url) === '/' + currentPage) ? 'active' : ''}`}
                    onMouseOver={handleHover}
                    onMouseLeave={(e) => addLinkClass(e)}
                    onTransitionEnd={removeLinkClass}          
                >
                    {item.label}
                </DelayLink>}
            </div>
        </li>
    )
    
    return (
      <>
        {MenuItemRoot}
      </>
    )
  };

export default NavList;

function removeLinkClass(e) {
    e.target.classList.remove('animate-out');
}

function addLinkClass(e) {
    e.target.classList.add('animate-out');
}