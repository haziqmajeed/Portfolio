import { gql } from '@apollo/client';
import { SiteOption } from '../site';

export const GET_JOIN = gql`
query MyQuery {
    ${SiteOption}
    pageBy(uri: "/join/") {
      content
      template {
          ... on DefaultTemplate {
            defaultPageOptions {
              bannerSlider {
                image {
                  sourceUrl
                  title(format: RENDERED)
                  altText
                }
                title
                text
                learnMore
                link
              }
            }
          }
        }
    join{
      heading
    }
    contactus{
      icon{
           sourceUrl
           title(format: RENDERED)
           altText
 		 }
      text
      volunteerLink
    }
    additionQuestion{
        addionalquestionicon{
             sourceUrl
             title(format: RENDERED)
             altText
            }
        addionalquestionheading
        additionalQuestionBackgroundImage{
            sourceUrl
            title(format: RENDERED)
            altText
           }
        joinLink
      }
      circleImage{
        circleimage{
                    sourceUrl
                    title(format: RENDERED)
                    altText
          }
      }
      
     
    
}
}
`;