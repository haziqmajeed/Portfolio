import { makeStyles } from '@material-ui/core/styles';
import BannerSlider from 'src/components/BannerSlider/BannerSlider';
import styles from 'src/components/Join/Join.module.scss';
import { sanitize } from 'src/utils/miscellaneous';
import Image from 'next/image';
import ImageComponent from './ImageComponent';
import ImageOpacityBox from '../ImageOpacityBox/ImageOpacityBox';


export default function Join({ data }) {
const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
  },
  iconSize:{
    minWidth:"90% !important",
    minHeight:"90% !important"
},
}))

const classes = useStyles();
console.log("data",data.pageBy?.contactus?.volunteerLink)
  return (
    
      <div>
        <BannerSlider slides={data?.pageBy?.template?.defaultPageOptions?.bannerSlider} />
       
        <div className={`container mx-auto p-16`}>
        <img className="fill-current absolute right-16 rounded-full border-4 border-yellow-300 w-32 h-32" src={data.pageBy?.circleImage?.circleimage?.sourceUrl}/>
          
          <div className={`grid w-11/12 items-center`}>   
            
              <h1 className="text-4xl font-medium 2xl:text-5xl">{data.pageBy?.join?.heading}</h1>
               <div
                  className="mt-8 2xl:text-xl"
                  dangerouslySetInnerHTML={{
                  __html: sanitize(data.pageBy?.content),
                  }}
              />
          </div>
          <div className="grid grid-cols-2 gap-10 mt-8">
            <ImageComponent/>
            <ImageComponent/>
            <ImageComponent/>
            <ImageComponent/>
          </div>

          <a className="flex justify-center mt-8 gap-6 p-8" style={{backgroundColor:"#f5f5f4"}}
          href={`${data.pageBy?.contactus?.volunteerLink}`}
          target= '_blank'
          >
              
              <Image
                src={data.pageBy?.contactus?.icon?.sourceUrl}
                width={50}
                className={classes.iconSize}
                height={50}
                alt="Color contrast"
              />
              
           
            <h1 className="text-3xl flex-initial pt-2 text-center 2xl:text-4xl">{data.pageBy?.contactus?.text}</h1>
            <img
                      src="/images/right-arrow-black.svg"
                      width={30}
                      className=""
                      alt="Right arrow"
                    />
          </a>
          <div className="mt-20">
           <ImageOpacityBox 
           icon={data.pageBy.additionQuestion?.addionalquestionicon?.sourceUrl} 
           heading={data.pageBy.additionQuestion?.addionalquestionheading} 
           textParagraph={data.pageBy.additionQuestion?.addionalquestiontext}
           backgroundPicture={data.pageBy.additionQuestion?.additionalQuestionBackgroundImage?.sourceUrl}
           link={data.pageBy?.additionQuestion?.joinLink}
           />
          </div>



        </div>
      </div>
    
  );
}
