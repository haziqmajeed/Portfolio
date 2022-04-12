import { gql } from "@apollo/client";

export const GET_FOOTER = gql`
 query GET_FOOTER {
    footerBy(uri: "/footer/footer/") {
        footer {
          grid1 {
            title
            logos {
              logo {
                altText
                sourceUrl
              }
            }
          }
          footerBottom {
            copyright
            facebookLink
            fieldGroupName
            instagramLink
            linkedinLink
            twitterLink
          }
          menu1 {
            title
            menu {
              text
              url
            }
          }
          menu2 {
            title
            menu {
              text
              url
            }
          }
          menu3 {
            title
            menu {
              text
              url
            }
          }
        }
    }
 }
`;