import useWindowSize from '@charlietango/use-window-size';
import cx from "classnames";
import React, { useCallback, useEffect, useState } from "react";

export const CursorContext = React.createContext("cursorContext");

const CursorProvider = ({ children }) => {
    const {width} = useWindowSize();
    const [cursor, setCursor] = useState(false);

    const [mobile, setMobile] = useState(width < 990);

    const onMouseMove = useCallback(
        event => {
            let { pageX: x, pageY: y } = event;
            let cursorElement = document.getElementById('cursor');
            if (x + 31 >= width) {
                setCursor('delete');
            } else if (cursor === 'delete') {
                setCursor(false);
            }
            cursorElement.style.left = x + 'px';
            cursorElement.style.top = y + 'px';
        },
        [cursor],
    )

    const handleHover = () => {
        setCursor('hover');
    }

    const handleLeave = () => {
        setCursor(false);
    }

    const handleGrab = () => {
        setCursor('grab');
    }

    const handleHide = () => {
        setCursor('pointer');
    }

    function handleResize() {
        if (width < 990) {
            setMobile(true);
        } else {
            setMobile(false);
        }
    }

    useEffect(() => {
        if (!mobile) {
            document.addEventListener("mousemove", onMouseMove);
        }

        window.addEventListener('resize', handleResize);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [mobile, onMouseMove]);

    return (
        <CursorContext.Provider value={{ handleHover, handleLeave, handleGrab, handleHide }}>
            {!mobile ? <ins
                className={cx('cursor cursor--scroll', {
                    'active': !!cursor,
                    [`cursor--${cursor}`]: !!cursor
                })}
                id="cursor">
                <div className="cursor__wrapper">
                    <div className="cursor__arrow cursor__arrow--1"></div>
                    <div className="cursor__arrow cursor__arrow--2"></div>
                </div>
            </ins> : null}
            {children}
        </CursorContext.Provider>
    );
};

export default CursorProvider;
