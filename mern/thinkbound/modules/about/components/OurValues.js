import React, { useContext, useRef } from 'react';
import Lottie from 'react-lottie';
import * as animation from '../../../animation';
import SlideIn from '../../../common/SlideIn';
import background from '../../../images/industry/expanding-bg.png';
import Image from 'next/image';
import { CursorContext } from './../../../providers/CursorProvider';
import useWindowSize from '@charlietango/use-window-size';
const OurValues = ({title,columns, values}) => {
    console.log("values",values)
    const { width } = useWindowSize();
    const valuesWrapper = useRef(null);
    const columnNumber = columns;
    // const columnClass="";
    // if(columnNumber==2){
    //     columnClass=""
    // }
    
    let { handleHover, handleLeave } = useContext(CursorContext);

    return (
        <div className="about__wrapper">
            {values[0]?.text ? <></> : <div className='about__image'>
                <Image src={background} alt=""  height="900px"/> 
             </div> }
            <div className={values[0]?.text ? 'about__content' : 'about__contentStorage'}>
            <h1 className="about__title about__title--values container">{title}</h1>
            <div className={values[0]?.text ? `about__values container` : `about__valuesStorage about__margin${columnNumber}`} ref={valuesWrapper}>
                {values.map((value, index) => {
                    let lottie = {
                        loop: true,
                        autoplay: true,
                        animationData: animation[value.icon],
                        rendererSettings: {
                            preserveAspectRatio: 'xMidYMid slice'
                        },
                    }
                    return (
                        value.text ? 
                        <SlideIn opacity={1} delay={index / 9} className={`about__value`} key={index} trigger={valuesWrapper.current}>
                            <div className="about__value-wrapper">
                                
                                <div className="about__value-icon-wrapper">
                                    <Lottie className="about__value-icon" options={lottie} />
                                </div>
                                <h3 className="about__value-title">{value.title}</h3>
                              
                            </div>
                            <p className="about__value-text">{value.text}</p>
                            {/* <ExpandingBackground trigger={valuesWrapper} className="" /> */}
       
                        </SlideIn>         
                            : 
                            <SlideIn opacity={1} delay={index / 9} className={width < 1100 ? `about__value about__width${columnNumber}` : `about__width${columnNumber}`} key={index} trigger={valuesWrapper.current}>
                            <div className="about__value-wrapper">
                                <a href={"#"}  className={width < 1100 ? "about__mobile-color" : "contact__item-link"}
                                        onMouseOver={handleHover}
                                        onMouseLeave={handleLeave}
                                    >
                                <div className="about__value-icon-wrapperStorage">
                                    <Lottie className="about__value-icon" options={lottie} />
                                </div>
                                <h3 className="about__value-titleStorage">{value.title}</h3>
                                </a>
                            </div>
                            
                            {/* <ExpandingBackground trigger={valuesWrapper} className="" /> */}
       
                        </SlideIn> 
                         
                        
                        
                        
                    );
                })}
                </div>
            </div>
        </div>
    )
}

export default OurValues
