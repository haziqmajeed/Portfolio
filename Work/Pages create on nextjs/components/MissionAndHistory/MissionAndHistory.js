import BannerSlider from 'src/components/BannerSlider/BannerSlider';
import ImageOpacityBox from 'src/components/ImageOpacityBox/ImageOpacityBox';
import styles from 'src/components/WhoWeAre/MissionAndHistory/MissionAndHistory.module.scss';
import { sanitize } from 'src/utils/miscellaneous';

export default function MissionAndHistory({ data }) {

  return (
    
    <>
    <BannerSlider slides={data?.pageBy?.template?.defaultPageOptions?.bannerSlider} />
    <div className={`container mx-auto p-16`}>
      <div className={`grid grid-rows-2 w-4/5 -mt-10 items-center`}>        
      <h1 className="text-lg mt-8 font-medium 2xl:text-2xl">{data.pageBy?.headline?.headline}</h1>
      <div
          className="text-left text-sm mb-10 2xl:text-xl"
          dangerouslySetInnerHTML={{
          __html: sanitize(data.pageBy.content),
          }}
      />
      
      </div>
      
       <div className={`${styles.snbnepDiv} grid h-96 justify-items-center content-center border-b-4 border-yellow-400`} style={{backgroundImage:`url(${data.pageBy?.indigenous_peoples_acknowledgement_box?.image?.sourceUrl})` }}>
        
        <p className={` ${styles.snbnepPara} p-8 text-3xl font-medium text-center 2xl:text-4xl`}>{data.pageBy.indigenous_peoples_acknowledgement_box.text}</p>
      </div>

      


    </div>
  </>
    
  );
}
