import React from 'react';
import cx from "classnames";

export default function Cursor({}) {

    return (
        <ins
            className={cx('cursor cursor--scroll', {
                'active': !!cursor,
                [`cursor--${cursor}`]: !!cursor
            })}
            id="cursor">
            <div className="cursor__wrapper">
                <div className="cursor__arrow cursor__arrow--1"></div>
                <div className="cursor__arrow cursor__arrow--2"></div>
            </div>
        </ins>
    );
}
