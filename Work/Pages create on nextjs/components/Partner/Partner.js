import BannerSlider from "src/components/BannerSlider";
import style from 'src/components/WhoWeAre/Partner/Partner.module.scss';
import { sanitize } from "src/utils/miscellaneous";
import PartnerContainer from './PartnerContainer';
import NationalEstuaryProgram from 'src/components/NationalEstuaryProgram/index';
export default function Partner( {data} ) {
    return (
      
        <div>
        <BannerSlider slides={data?.pageBy?.template?.defaultPageOptions?.bannerSlider} />
        <div className="p-20">
            <div class="w-full h-80 bg-gray-200 p-6 lg:max-w-full lg:flex">  
              <div class={`${style.borderColor} border-b-2 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal`}>
                <div>
                    <div className="grid grid-cols-3 place-items-center">
                    <div className="">
                     <img class="fill-current rounded-full text-gray-500 w-52 h-52 mr-2" src={data.pageBy?.partner?.image?.sourceUrl}/>      
                    </div>
                    <div className="col-span-2 pt-4 grid gap-6 items-center">
                        <h1 className="text-3xl 2xl:text-4xl">{data.pageBy?.partner?.title}</h1>
                        <div
                    className="text-sm pr-14 text-gray-600 2xl:text-xl"
                    dangerouslySetInnerHTML={{
                    __html: sanitize(data.pageBy.content),
                    }}
                />
                        <div className={`${style.animate} text-xl w-48 mb-2`}>Download PDF 
                        <img
                        src="/images/right-arrow-black.svg"
                        width={30}
                        className={`${style.animate}  inline-block ml-4 mb-1`}
                        alt="Right arrow"
                    />
                        
                        </div>
                    </div>
                    
                    </div>                                       
                </div>        
             </div>
            </div>

            <PartnerContainer heading={data.pageBy.linksAndHeading.heading} content={data.pageBy.linksAndHeading.links}/>
            <PartnerContainer heading={data.pageBy.linksAndHeading.heading2} content={data.pageBy.linksAndHeading.links2}/>
            <PartnerContainer heading={data.pageBy.linksAndHeading.heading3} content={data.pageBy.linksAndHeading.links3}/>
            <PartnerContainer heading={data.pageBy.linksAndHeading.heading4} content={data.pageBy.linksAndHeading.links4}/>
            <NationalEstuaryProgram/>

        </div>
            
        </div>
    )
}