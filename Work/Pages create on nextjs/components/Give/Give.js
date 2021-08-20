import { makeStyles } from '@material-ui/core/styles';
import BannerSlider from 'src/components/BannerSlider/BannerSlider';
import styles from 'src/components/Give/Give.module.scss';
import { sanitize } from 'src/utils/miscellaneous';
import CardComponent from './CardComponent';
import AccordionComponent from '../Accordion/AccordionComponent';
import { useState } from 'react';
import ImageOpacityBox from '../ImageOpacityBox/ImageOpacityBox';
import Image from 'next/image';


export default function Give({ data }) {
const [donateColor,setDonateColor] = useState({backgroundColor:"#16a7d8",transition:"0.2s"})
const [donateSize,setDonateSize] = useState("py-3 px-8 2xl:px-6 2xl:py-3.5 2xl:pt-4")

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  iconSize:{
    minWidth:"90% !important",
    minHeight:"90% !important",
},
donateWidth:{
  
    
    transition: "transform .2s",
    padding:"12px 34px 12px 34px",
    color:"white",
    cursor: "pointer",
    '&:hover': {
    padding:"12px 24px 12px 24px",
    transform: "scale(1.01)",
    
    }
},
}))

const classes = useStyles();
// const [donatePadding,setDonatePadding] = useState(px-8);
  return (
    
      <div>
        
        <BannerSlider slides={data?.pageBy?.template?.defaultPageOptions?.bannerSlider} />
        <div className={`container mx-auto p-16`}>
            <div className={`grid grid-rows-2 w-full -mt-10 items-center`}>        
              <h1 className="text-3xl 2xl:text-5xl">{data?.pageBy?.give?.giveheading}</h1>
              <div
                  className="text-left text-sm mb-10 2xl:text-xl"
                  dangerouslySetInnerHTML={{
                  __html: sanitize(data?.pageBy?.content),
                  }}
              />
        
            </div>    
            <div className="grid grid-cols-3 gap-24">
                 <CardComponent image={data?.pageBy?.workInFields?.workinfieldimage.sourceUrl} heading={data?.pageBy?.workInFields?.workinfieldheading}/>
                 <CardComponent image={data?.pageBy?.scientificResearchs?.scientificresearchimage.sourceUrl} heading={data?.pageBy?.scientificResearchs?.scientificresearchheading}/>
                 <CardComponent image={data?.pageBy?.communityCollabs?.communitycollabimage.sourceUrl} heading={data?.pageBy?.communityCollabs?.communitycollabheading}/>
            </div>
            <div className="grid grid-rows-2 gap-4 mt-10">
            <div
                  className="2xl:text-2xl"
                  dangerouslySetInnerHTML={{
                  __html: sanitize(data?.pageBy?.oneTimeGift?.onetimetext),
                  }}
              />
             


                <div className={`${styles.cursorPointer} w-56 2xl:w-64`}
                onMouseEnter={(e) => {
                  setDonateColor({backgroundColor:"#218aad",transition:"0.2s"});
                   setDonateSize("px-5 py-3 2xl:px-3 2xl:py-3.5 2xl:pt-4");
                }}
                onMouseLeave={(e) => {
                  setDonateColor({backgroundColor:"#16a7d8",transition:"0.2s"});
                  setDonateSize("px-8 py-3 2xl:px-6 2xl:py-3.5 2xl:pt-4");
                }}
                >
                  <div className={` text-white w-14 h-14 float-left border-r-2 border-white p-3 2xl:h-16 2xl:w-3/12`} style={donateColor}>
                  <Image
                    src="/images/paypal.png"
                    width={50}
                  
                    height={50}
                    alt="Color contrast"
                />

                  </div>
                  <div className={`inline-block bg-brand-orange text-white ${donateSize} 2xl:h-16 2xl:text-2xl `} style={donateColor}>Donate Now</div>
                </div>

                



            </div>

          <div className={`mt-16 grid`} style={{backgroundColor:"#f5f5f4"}}>
          
            
            <div className="h-auto p-8">
            <div className="text-3xl mb-8 h-10 2xl:text-5xl">
              <h1>FAQs</h1>
            </div>
              <AccordionComponent imgWidth="49% !important" imgHeight="60% !important" image={data?.pageBy?.faqs?.icon1.sourceUrl} heading={data?.pageBy?.faqs?.heading1} text={data?.pageBy?.faqs?.text1}/>
              <AccordionComponent imgWidth="63% !important" imgHeight="37% !important" image={data?.pageBy?.faqs?.icon2.sourceUrl} heading={data?.pageBy?.faqs?.heading2} text={data?.pageBy?.faqs?.text2}/>
              <AccordionComponent imgWidth="60%!important" imgHeight="60% !important" image={data?.pageBy?.faqs?.icon3.sourceUrl} heading={data?.pageBy?.faqs?.heading3} text={data?.pageBy?.faqs?.text3}/>
              <AccordionComponent imgWidth="60% !important" imgHeight="60% !important" image={data?.pageBy?.faqs?.icon4.sourceUrl} heading={data?.pageBy?.faqs?.heading4} text={data?.pageBy?.faqs?.text4}/>
              <AccordionComponent imgWidth="60% !important" imgHeight="60% !important" image={data?.pageBy?.faqs?.icon5.sourceUrl} heading={data?.pageBy?.faqs?.heading5} text={data?.pageBy?.faqs?.text5}/>
            </div>
           
            <ImageOpacityBox 
            icon={data.pageBy.additionQuestion1?.addionalquestionicon?.sourceUrl} 
            heading={data.pageBy.additionQuestion1?.addionalquestionheading} 
            textParagraph={data.pageBy.additionQuestion1?.addionalquestiontext}
            backgroundPicture={data.pageBy.additionQuestion1?.additionalQuestionBackgroundImage?.sourceUrl}
            link={data.pageBy.additionQuestion1?.additionalQuestionLink}
            fontFamily={true}
           />
          </div>
        </div>
      </div>
    
  );
}
