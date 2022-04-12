import React,{useEffect, useRef} from 'react';
import {gsap, Power3, Expo} from 'gsap';
import LogoSvg from './LogoSvg';
function IntroPreload() {

    const PreloadContents = useRef(null);

    const getTo = useRef(null);
    const Get = useRef(null)
    const GetSpan = useRef(null)
    const To = useRef(null)
    const ToSpan = useRef(null)

    const BreakThrough = useRef(null)  
    const Break = useRef(null)
    const Breakpan = useRef(null)
    const Through = useRef(null)  
    const ThroughSpan = useRef(null)

    const preLoadWrap = useRef(null);

    const IconAni = useRef(null);

    const transparentBg = useRef(null);

    const AniDuration = 0.05;



    const TextIntroAni = () => {
        const IntroTl = gsap.timeline({
            onComplete:nextBreakThrough,
            delay:0.5
        });
        IntroTl
        .set(getTo.current,{ 
            autoAlpha:1,
        })
        .set(PreloadContents.current,{
            autoAlpha:1,
        })
        .set(preLoadWrap.current,{ 
            background:"#0965c5",
            autoAlpha:1
        }, 0.1) 
        .to(GetSpan.current,{  
            yPercent:0,
            duration:0.2,
            ease:Expo.easeOut
        })
        .to(ToSpan.current, {
            xPercent:0,
            duration:0.2,
            ease:Expo.easeOut
        }, 
            0.7 
        )
        .to(Get.current, { 
            xPercent:0,   
            duration:0.2,
            ease:Expo.easeOut
        }, 0.7)
        .to(getTo.current,{
            autoAlpha:0,
            duration:0.3,
        })
        
        function nextBreakThrough(){   
            const IntroTl2 = gsap.timeline({
                onComplete:nextLogoAni
            });
            IntroTl2
            .set(BreakThrough.current,{
                autoAlpha:1,
            })    
            .to(Breakpan.current,{
                yPercent:0,
                duration:0.1, 
                ease:Expo.easeOut
            })
            .to(ThroughSpan.current, {
                xPercent:0,
                duration:0.03,
                ease:Expo.easeOut
            }, 
                0.7 
            )
            .to(Break.current, {
                xPercent:0,
                duration:AniDuration,
                ease:Expo.easeOut
            }, 0.7)
        }
 
        function nextLogoAni(){

            gsap.set(transparentBg.current,{
                backgroundSize:100,
                display:"block",
                autoAlpha:1,
            })   

            const IntroTl3 = gsap.timeline({onComplete:startFinalAni});
            IntroTl3
            .to(IconAni.current, {  
                height:"auto", 
            }, 0.1)
            .to(preLoadWrap.current,{ 
                background:"#77baff"
            }, 0.1)
            .to(preLoadWrap.current,{ 
                background:"#fff"
            }, 0.4)
            .to(preLoadWrap.current,{
                autoAlpha:0,
            }, 0.4);
             
        }
    }

    function setStyle(){

        gsap.set(Get.current, {  
            xPercent:50,
        })
        gsap.set(GetSpan.current, {
            yPercent:-100,
        })
        gsap.set(ToSpan.current, {  
            xPercent:-100,
        }) 

        gsap.set(Break.current, {
            xPercent:75,
        })
        gsap.set(Breakpan.current, { 
            yPercent:-100,
        })
        gsap.set(ThroughSpan.current, { 
            xPercent:-100,
        })
        gsap.set(ThroughSpan.current, {
            xPercent:-100,
        }) 

        gsap.set(IconAni.current, {
            height:0
        })

        const HeaderMain = document.querySelector(".header--main");
        const BannerTitleText = document.querySelectorAll(".banner__title .banner__title-text");
        const BannerTextMask = document.querySelectorAll(".banner__text .text-mask span");
        const BannerButtonWrap = document.querySelectorAll(".banner--main .banner__button-wrapper .button");
        
        gsap.set(HeaderMain, {
            y:-100,
            autoAlpha:0,
        })
        gsap.set(BannerTitleText, {
            y:100,
            autoAlpha:0,
        })
        gsap.set(BannerTextMask, {
            y:100,
            autoAlpha:0,
        })
        gsap.set(BannerButtonWrap, {
            y:100,
            autoAlpha:0,
        }) 

    }

    function startFinalAni(){
        
        const getWindowWidth = window.innerWidth + 400;
        const scTl = gsap.timeline({
            onComplete:HeroTextAni
        });    

        scTl.to(transparentBg.current, {
            backgroundSize:getWindowWidth,
            duration:0.5, 
            ease:Expo.easeIn 
        })
        .to(transparentBg.current, {
            autoAlpha:0,
        }).set(transparentBg.current,{
            display:"none"
        })
    } 

    function HeroTextAni(){
        const AniHeaderMain = document.querySelector(".header--main");
        const AniBannerTitleText = document.querySelectorAll(".banner__title .banner__title-text");
        const AniBannerTextMask = document.querySelectorAll(".banner__text .text-mask span");
        const AniBannerButtonWrap = document.querySelectorAll(".banner--main .banner__button-wrapper .button");

        const HeroTl = gsap.timeline();

        HeroTl.to(AniHeaderMain,{
            y:0,
            autoAlpha:1,  
            duration:0.3 
        }).to(AniBannerTitleText,{
            y:0,
            autoAlpha:1,  
            duration:0.3 
        }).to(AniBannerTextMask,{
            y:0,
            autoAlpha:1,  
            duration:0.3 
        }).to(AniBannerButtonWrap,{
            y:0,
            autoAlpha:1,  
            duration:0.3 
        })

    }



    useEffect(() => {
        setStyle();
        TextIntroAni();
        return () => {
            false
        };
    }, []);

    return (
        <>
            <div ref={preLoadWrap} className="preload-wrapper">
                <div ref={PreloadContents} className="preload-content">
                    <div ref={getTo} className="get-to">
                        <div className="get" ref={Get}><span ref={GetSpan}>Get</span></div>
                        <div className="to" ref={To}><span ref={ToSpan}>to</span></div>
                    </div>
                    <div ref={BreakThrough} className="break-through">
                        <div className="break" ref={Break}><span ref={Breakpan}>break</span></div>
                        <div className="through" ref={Through}><span ref={ThroughSpan}>through</span></div>
                    </div>
                    <div className="logo-wrap"> 
                        <div className="icon_wrapper">
                            <div ref={IconAni} className="icon_ani">
                                <LogoSvg/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref={transparentBg} className="preload-logo-scale"></div>
        </>
    );
}

export default IntroPreload;