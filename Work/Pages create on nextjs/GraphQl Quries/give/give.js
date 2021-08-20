import { gql } from '@apollo/client';
import { SiteOption } from '../site';

export const GET_GIVE = gql`
query MyQuery {
  ${SiteOption}
  pageBy(uri: "/give/") {
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
  give{
    giveheading
  }
  workInFields{
    workinfieldimage{
         sourceUrl
         title(format: RENDERED)
         altText
    }
    workinfieldheading
  }
  scientificResearchs{
    scientificresearchimage{
      sourceUrl
         title(format: RENDERED)
         altText
      
    }
    scientificresearchheading
  }
  communityCollabs{
    communitycollabimage{
      sourceUrl
         title(format: RENDERED)
         altText
      
    }
    communitycollabheading
    
  }
  oneTimeGift{
    onetimetext
  }
  faqs{
    icon1{
      sourceUrl
         title(format: RENDERED)
         altText
    }
    heading1
    text1
    icon2{
      sourceUrl
         title(format: RENDERED)
         altText
    }
    heading2
    text2
    icon3{
      sourceUrl
         title(format: RENDERED)
         altText
    }
    heading3
    text3
    icon4{
      sourceUrl
         title(format: RENDERED)
         altText
    }
    heading4
    text4
    icon5{
      sourceUrl
         title(format: RENDERED)
         altText
    }
    heading5
    text5
  }
   additionQuestion1{
      addionalquestionicon{
           sourceUrl
           title(format: RENDERED)
           altText
          }
      addionalquestionheading
      addionalquestiontext
      additionalQuestionBackgroundImage{
          sourceUrl
          title(format: RENDERED)
          altText
         }
      additionalQuestionLink
    }
  
  

  
   
  
  
    
   
  
}
}
`;