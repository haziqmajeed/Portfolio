import React, { useState } from 'react';
import CustomSwiper from '../../CustomSwiper/CustomSwiper';
import SideText from '../../SideText';
import CaseCard from './CaseCard';
import CaseList from './CaseList';

export default function Case(props) {
    const [itemIndex, setItemIndex] = useState(0);
    const {title, sectionText, textSmall, caseStudies, index} = props

    return (
        <div style={{backgroundColor: '#f8f8f8', marginTop: '-5px'}}>
            <section className="section case" id="case-wrapper">
                <div className="title case__title container">
                    <div className="title__cat">{textSmall}</div>
                    <h2>{title}</h2>
                </div>

                <div className="case__wrapper container">
                    <SideText modificator="case" wrapper="case-wrapper">{sectionText}</SideText>
                    <div className="case__column">
                        <CaseList itemIndex={itemIndex} gallery={caseStudies} />
                    </div>
                    <CustomSwiper gallery={caseStudies} Component={CaseCard} ClassName="case" id={`case_${index}`} setItemIndex={setItemIndex} />
                </div>
            </section>
        </div>
    )
}
