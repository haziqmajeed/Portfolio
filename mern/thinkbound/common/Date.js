import React from 'react'
import Clock from './icons/Clock';

export default function Date({date}) {
    return (
        <div className="card__date">
            <Clock className="card__date-icon" />
            <span>{date}</span>
        </div>
    )
}
