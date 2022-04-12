import useWindowSize from '@charlietango/use-window-size';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from "prop-types";
import React, { useContext, useEffect, useState } from "react";
import { TransitionContext } from "../providers/TransitionProvider";

// Functional link component which delays page navigation
export const DelayLink = props => {
    const { delay, replace, to, onHeaderLinkClick, blockMobile = false, ...rest } = props;

    const { width } = useWindowSize();

    let timeout = null;
    
    const router = useRouter();

    const [mobileScreen, setMobileScreen] = useState(false);
    
    let {setPlayTransition} = useContext(TransitionContext);

    function handleMobileScreen() {
        if (width < 990) {
            setMobileScreen(true);
        } else {
            setMobileScreen(false);
        }
    }

    useEffect(() => {
        handleMobileScreen();
        if (process.browser) {
            window.addEventListener('resize', handleMobileScreen);
        }
        
        return () => {
            if (process.browser) {
                window.removeEventListener('resize', handleMobileScreen);
            }
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [timeout]);

    function onDelayStart() {
        setPlayTransition(true);
    }

    function onDelayEnd() {
        window.scrollTo(0, 0);
        setPlayTransition(false);
    }

    const handleClick = e => {
        // console.log("to",to+"\nrouter",router?.asPath+"/")
        // if trying to navigate to current page stop everything

        if (router?.asPath === to) return;
        else if (router?.asPath+"/" === to) return;

        onDelayStart(e, to);
        if (e.defaultPrevented) {
            return;
        }

        e.preventDefault();

        timeout = setTimeout(() => {
            router.push(to)
            onDelayEnd(e, to);
        }, blockMobile ? (mobileScreen ? 0 : delay) : delay);
    };

    return (
        <Link href={to}>
            <a {...rest} onClick={handleClick} />
        </Link>
    );
};

DelayLink.propTypes = {
    // Milliseconds to wait before registering the click.
    delay: PropTypes.number,
    // Called after the link is clicked and before the delay timer starts.
    // Replace history or not
    replace: PropTypes.bool,
    // Link to go to
    to: PropTypes.string
};

DelayLink.defaultProps = {
    replace: false,
    delay: 500,
};

export default DelayLink;