import React from 'react';
import ParallaxBackground from '../../../../../common/ParallaxBackground';

export default function IndustryCard({image}) {
    return (
        <div className='industry__card'>
            <ParallaxBackground image={image} className="industry__card-image" />
        </div>
    )
}
