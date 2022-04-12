import Link from 'next/link';
import React from 'react';
import Date from './../../../../../common/Date';

export default function TestimonialsCard({ item, ...props }) {
    return (
        <Link href={`/blogs${item.uri}`}>
            <a className="card card--news" data-card {...props}>
                <div className="card__background" style={{ backgroundImage: `url(${item?.featuredImage?.node?.sourceUrl})` }} data-image></div>
                <div className="card__wrapper">
                    <h1 className="card__title">{item?.title}</h1>
                    <Date date={item?.date} />
                </div>
            </a>
        </Link>
    )
}
