import React from 'react';
import { DelayLink } from './DelayLink';

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

export default function Dropdown({ list, className, handleHover, handleLeave, onHeaderLinkClick, dropdown, submenu, toggleSubmenu, submenuOpened, mobileScreen, dropdownOpened, onDelayStart, onDelayEnd }) {

    return (
        <div className={"dropdown " + (className || "") + (dropdownOpened ? " opened" : "")} ref={dropdown}>
            <div className="dropdown__wrapper" >
                <ul className="dropdown__list">
                    {list.map(item => {
                        return (
                            <li
                                className={`dropdown__item ${item.id}`}
                                key={item.id}
                                onMouseLeave={(item?.children?.length !== 0 && !mobileScreen) ? toggleSubmenu : () => false}
                                onMouseEnter={(item?.children?.length !== 0 && !mobileScreen) ? toggleSubmenu : () => false}
                            >
                                <DelayLink className="dropdown__link" blockMobile={true} to={RelativeLink(item?.url)} onMouseOver={handleHover} onMouseLeave={handleLeave} onClick={onHeaderLinkClick}>{item?.label}</DelayLink>
                                {item?.children?.length !== 0 && <button className={"open open--header open--dropdown"} onClick={toggleSubmenu}></button>}
                                {item?.children?.length !== 0 && (
                                    <div className={`dropdown__submenu ${item.id}`} data-submenu key={item.id} ref={submenu}>
                                        <ul className="dropdown__submenu-list" data-submenu-content>
                                            {item?.children.map(subitem => {
                                                return (
                                                    <li className={`dropdown__item`} key={subitem.id}>
                                                        <DelayLink className="dropdown__link dropdown__link--submenu" blockMobile={true} to={RelativeLink(subitem?.url)} onMouseOver={handleHover} onMouseLeave={handleLeave} onClick={onHeaderLinkClick}>
                                                            {subitem.label}
                                                        </DelayLink>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    )
}
