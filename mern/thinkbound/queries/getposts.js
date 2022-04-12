import { gql } from "@apollo/client";
import SeoFragment from "./seoFragment";

export const GET_POSTS_URI = gql`
 query GET_POSTS_URI {
  posts: posts(last: 1) {
    nodes {
      id
      uri
    }
  }
 }
`;
export const GET_POST = gql`
	query GET_POST($uri: String) {
	  post: postBy(uri: $uri) {
		id
		title
		slug
		uri
        content
        featuredImage {
            node {
              altText
              sourceUrl(size: LARGE)
            }
        }
		seo {
			...SeoFragment
		}
        next {
            uri
            title
            featuredImage {
              node {
                altText
                sourceUrl(size: POST_THUMBNAIL)
              }
            }
        }
        previous {
            uri
            title
            featuredImage {
              node {
                altText
                sourceUrl(size: POST_THUMBNAIL)
              }
            }
        }
	  }
	}
	${SeoFragment}
`;
export const GET_POSTS = gql`
	query GET_PAGE {
	  posts(first: 50000) {
      nodes {
        title
        date
        id
        excerpt(format: RENDERED)
        featuredImage {
        node {
          altText
          sourceUrl(size: POST_THUMBNAIL)
        }
        }
        uri
      }
	  }
    pageBy(uri: "/blogs") {
      id
      title
      pageblog {
        sectionText
        lineText {
          text
        }
      }
      seo {
        ...SeoFragment
      }
    }
	}
  ${SeoFragment}
`;