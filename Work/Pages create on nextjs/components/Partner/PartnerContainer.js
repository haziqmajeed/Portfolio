import { sanitize } from "src/utils/miscellaneous"
import sanitizeHtml from 'sanitize-html';
import style from 'src/components/WhoWeAre/Partner/Partner.module.scss';
export default function PartnerContainer( {heading,content}) {

    const openLinksInNewTab = (value) => {
        return sanitizeHtml(value, {
            allowedAttributes: {
                a: ['href', 'target', 'rel']
            },
    
            transformTags: {
                a(tagName, attribs) {
                    return {
                        tagName,
                        attribs: {
                            rel:"noopener",
                            target: '_blank',
                            href: attribs.href,
                            
                        }
                    }
                }
            }
        })
    }

  
    return (
      
            <div class="w-full mt-20 h-auto bg-gray-200 p-6 lg:max-w-full lg:flex">  
              <div class={`${style.borderColor} border-b-2 w-full bg-white rounded-b lg:rounded-b-none lg:rounded-r pb-12 pl-28 pr-28 pt-8 gap-8 flex flex-col justify-between leading-normal`}>
                <div className="flex text-3xl 2xl:text-5xl">
                    {heading}
                </div> 
             
                <div
                    className={`${style.linkColor} grid grid-rows-4 gap-2 grid-cols-2 auto-cols-max 2xl:text-xl`}
                    dangerouslySetInnerHTML={{
                    __html: sanitize(openLinksInNewTab(content)),
                }}
                />
                
                                                    
                       
             </div>
            </div>
    )
}