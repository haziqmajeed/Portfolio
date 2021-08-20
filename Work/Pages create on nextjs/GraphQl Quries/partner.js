import { gql } from '@apollo/client';
import { SiteOption } from '../site';

export const GET_PARTNER = gql`
query MyQuery {
    ${SiteOption}
    pageBy(uri: "/who-we-are/partners/") {
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
      partner{
        title
        image {
            sourceUrl
            title(format: RENDERED)
            altText
          }
      }
      linksAndHeading {
        heading
        links
        heading2
        links2
        heading3
        links3
        heading4
        links4
      }
    }
  }
`;