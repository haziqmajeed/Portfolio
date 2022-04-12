import Image from 'next/image';
import React from 'react';
import Star from '../../icons/Star';

export default function TestimonialsCard({ item }) {
    return (
        <div className="card card--testimonials">
            <Image height={90} width={90} src={item?.featuredImage?.node?.sourceUrl} className="card__image" alt={item?.featuredImage?.node?.altText}/>
            <p className="card__text">{item?.testimonialSingle?.text}</p>
            <ul className="card__rating">
                {[...Array(parseInt(item?.testimonialSingle?.rating))].map((x, i) =>
                    <li key={i} className="card__rating-item"><Star className="card__rating-icon"/></li>
                )}

            </ul>
            <h2 className="card__title">{item.testimonialSingle.author}</h2>
        </div>
    )
}
