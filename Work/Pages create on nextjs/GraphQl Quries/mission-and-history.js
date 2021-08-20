import { gql } from '@apollo/client';
import { SiteOption } from '../site';

export const GET_MISSION_AND_HISTORY = gql`
  query MyQuery {
    ${SiteOption}
    pageBy(uri: "/who-we-are/missionhistory/") {
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
      indigenous_peoples_acknowledgement_box {
        image {
          sourceUrl
        }
        text
        
      }
      headline {
        headline
      }
    }
  }
`;