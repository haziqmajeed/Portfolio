import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import Lottie from 'react-lottie';
import * as animation from '../../../../animation';

export default function ImageAndParagraph(props) {
    var count = 0;
    return (
        <>
        <section className='container image_and_paragraph_container'>
            {props?.imageAndParagraphs?.map((section, index) => {
                count++;
                let lottie = {
                    loop: true,
                    autoplay: true,
                    animationData: animation[section?.icon],
                    rendererSettings: {
                        preserveAspectRatio: 'xMidYMid slice'
                    },
                }
                return (
                    count%2==0 ? <section className='main_section1'>  
                           <div className='title_icon'>
                           <div className="value-icon-wrapper">
                                <Lottie className="about__value-icon" options={lottie} />     
                            </div>
                            <h1 className="heading">{section?.title}</h1>
                        </div>   
                        
                        <div className='image_and_paragraph sub-container' key={index}>
                     
                     
                    <div className='section_three'>
                        
                        <div key={index} className="imageAndParagraph__content-text" dangerouslySetInnerHTML={{__html: section?.paragraph}} />
                    </div>
                    <div className='section_one'>
                        <Image className="" src={section?.image?.sourceUrl} height="1400" width="2700"/>
                    </div>
        
                    </div> </section>  : <section className='main_section2'> 
                    
                    <div key={index} className='image_and_paragraph sub-container'>
                    
                    <div className='section_one'>
                        <Image className="" src={section?.image?.sourceUrl} height="1400" width="2700" />
                    </div>
                    <div className='section_two'>
                        <div className='title_icon'>
                            <div className="value-icon-wrapper">
                                <Lottie className="about__value-icon" options={lottie} />     
                            </div>
                            <h1 className="heading">{section?.title}</h1>
                        </div>
                        <div key={index} className="imageAndParagraph__content-text" dangerouslySetInnerHTML={{__html: section?.paragraph}} />
                    </div>
                    
                </div> </section>
                 
                )
                
                    
            })}
            
            

            </section>
          
            
        </>
    )
}

