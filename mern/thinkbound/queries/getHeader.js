import { gql } from "@apollo/client";

export const GET_HEADER = gql`
 query GET_HEADER {
    getHeader {
        siteLogoUrl
    }
    menus(where: {location: PRIMARY}) {
        nodes {
          id
          name
          menuItems(first: 5000) {
            nodes {
              id
              label
              url
              parentId
            }
          }
        }
    }
 }
`;