import { gql } from "@apollo/client";
import SeoFragment from "./seoFragment";

export const GET_CASES_URI = gql`
 query GET_CASES_URI {
  caseStudies(last: 1) {
    nodes {
      id
      uri
    }
  }
 }
`;

export const GET_CASE = gql`
	query GET_CASE($uri: String) {
    caseStudieBy(uri: $uri) {
      id
      title
      uri
      featuredImage {
        node {
          altText
          sourceUrl
        }
      }
      seo {
        ...SeoFragment
      }
      next {
        title
        uri
        id
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
      }
      previous {
        title
        uri
        id
        featuredImage {
          node {
            altText
            sourceUrl
          }
        }
      }
      casesingle {
        sections {
          ... on CaseStudie_Casesingle_Sections_CasepageLeftContentRightList {
            description
            fieldGroupName
            sectionText
            title
            listTitle
            list {
              text
            }
          }
          ... on CaseStudie_Casesingle_Sections_CasepageFixednavsections {
            fieldGroupName
            navTitle
            sections {
              title
              text
              image {
                altText
                sourceUrl
              }
              icon {
                altText
                sourceUrl
              }
            }
          }
          ... on CaseStudie_Casesingle_Sections_CasepageResults {
            fieldGroupName
            sectionText
            results {
              title
              text
              image {
                altText
                sourceUrl
              }
            }
          }
          ... on CaseStudie_Casesingle_Sections_CasepageFeedback {
            fieldGroupName
            text
            title
            user
            image {
              altText
              sourceUrl
            }
          }
        }
      }
    }
	}
	${SeoFragment}
`;

export const GET_CASES = gql`
	query GET_CASES {
        caseStudies {
            nodes {
              id
              next {
                title
                uri
              }
              previous {
                title
                uri
              }
              featuredImage {
                node {
                  altText
                  sourceUrl(size: POST_THUMBNAIL)
                }
              }
              uri
              title
              terms {
                nodes {
                  ... on Category {
                    id
                    name
                  }
                }
              }
            }
        }
        pageBy(uri: "/case-studies") {
            id
            title
            seo {
                ...SeoFragment
            }
            pagecase {
              sectionText
              casepageHero {
                backgroundImage {
                  altText
                  sourceUrl
                }
                video {
                  mediaItemUrl
                }
              }
              heroBottom {
                desktop {
                  text
                }
                mobile {
                  text
                }
              }
            }
        }
	}
    ${SeoFragment}
`;