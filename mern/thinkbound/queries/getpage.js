import { gql } from "@apollo/client";
import SeoFragment from "./seoFragment";

export const GET_PAGES_URI = gql`
 query GET_PAGES_URI {
  pages: pages(first: 50000) {
    nodes {
      id
      uri
    }
  }
 }
`;

export const GET_PAGE = gql`
	query GET_PAGE($uri: String) {
	  page: pageBy(uri: $uri) {
		id
		title
		slug
		uri
		seo {
			...SeoFragment
		}
		pagesections {
		  sections {
			... on Page_Pagesections_Sections_HomepageHero {
			  content
			  fieldGroupName
			  titleText1
			  titleText2
			  btnText
			  btnUrl
			  bannerVideo {
				mediaItemUrl
			  }
			}
			... on Page_Pagesections_Sections_HomepageReputation {
				fieldGroupName
				lineText1
				lineText1Highlight
				lineText2
				sectionText
				title
				images {
				  image {
					altText
					sourceUrl
				  }
				}
			}
			... on Page_Pagesections_Sections_HomepageServices {
				fieldGroupName
				sectionText
				servicesTextSmall
				title
				servicesCards {
				  cards {
					icon
					title
					items {
					  title
					  url
					}
				  }
				}
			}
			... on Page_Pagesections_Sections_HomepageAboutUs {
				description
				sectionBg {
					sourceUrl
				}
				fieldGroupName
				sectionText
				servicesTextSmall
				title
				images {
				  image {
					altText
					sourceUrl
				  }
				}
			}
			... on Page_Pagesections_Sections_HomepageIndustries {
				fieldGroupName
				sectionText
				title
				image {
					altText
					sourceUrl
				}
				menuItems {
				  icon
				  title
				}
			}
			... on Page_Pagesections_Sections_HomepageApproach {
				fieldGroupName
				sectionText
				title1
				title2
				title3
			}
			... on Page_Pagesections_Sections_CaseStudies {
				fieldGroupName
				sectionText
				textSmall
				title
			}
			... on Page_Pagesections_Sections_SectionTestimonials {
				fieldGroupName
				sectionText
				textSmall
				title
				url
				testimonialsGallery {
				  author
				  text
				  rating
				  image {
					altText
					sourceUrl
				  }
				}
			}
			... on Page_Pagesections_Sections_PostsSection {
				fieldGroupName
				sectionText
				title
				url
			}
			... on Page_Pagesections_Sections_InnerpageHeroVideoBg {
				beforeTitle
				fieldGroupName
				title
				video {
				  mediaItemUrl
				}
				backgroundImage {
					sourceUrl
				}
			}
			... on Page_Pagesections_Sections_InnerpageOurvision {
				sectionText
				content
				counterText
				number
				fieldGroupName
				image {
				  altText
				  sourceUrl
				}
			}
			... on Page_Pagesections_Sections_InnerpageOurvalues {
				fieldGroupName
				title
				columns
				values {
				  icon
				  text
				  title
				}
			}
			... on Page_Pagesections_Sections_InnerpageExpertise {
				fieldGroupName
				sectionText
				title
				expertise {
				  icon
				  title
				  texts {
					text
				  }
				}
			}
			... on Page_Pagesections_Sections_InnerpageClients {
				fieldGroupName
				title
				clients {
				  website
				  logo {
					altText
					sourceUrl
				  }
				}
			}
			... on Page_Pagesections_Sections_ContactpageInfo {
				beforeFormText
				fieldGroupName
				title
				sectionText
				contactInfo {
				  icon
				  link
				  text
				  title
				}
			}
			... on Page_Pagesections_Sections_ContactpageMap {
				fieldGroupName
				test
			}
			... on Page_Pagesections_Sections_InnerpageHeroWithForm {
				fieldGroupName
				backgroundImage{
					altText
					sourceUrl
				}
				title
				text {
				  text
				}
				images {
				  image {
					altText
					sourceUrl
				  }
				}
			}
			... on Page_Pagesections_Sections_InnerpageLeftTextRightImageAndText {
				content
				fieldGroupName
				sectionText
				buttons {
					link
					text
				}
				image {
				  altText
				  sourceUrl
				}
			}
			... on Page_Pagesections_Sections_InnerpageServicescard {
				beforeTitle
				fieldGroupName
				title
				services {
				  title
				  text
				  image {
					altText
					sourceUrl
				  }
				}
			}
			... on Page_Pagesections_Sections_InnerpageCallToAction {
				callButtonLink
				callButtonText
				title
			}
			... on Page_Pagesections_Sections_InnerpageContentWithTopRightImage {
				fieldGroupName
				title
				afterTitle
				contentSections {
				  content
				}
				image {
				  altText
				  sourceUrl
				}
			}
			... on Page_Pagesections_Sections_SectionAccordion {
				title
				accordions {
				  title
				  text
				  opened
				}
			}
			... on Page_Pagesections_Sections_SectionSpacer {
				bgColor
				desktop
				fieldGroupName
				mobile
			}
			... on Page_Pagesections_Sections_ImageAndParagraph {
				imageAndParagraphs {
					icon
				  paragraph
				  title
				  image {
					sourceUrl
				  }
				}
			}
			... on Page_Pagesections_Sections_BackgroundBanner {
				fieldGroupName
				background {
				  sourceUrl
				}
				front {
				  sourceUrl
				}
				front2{
					sourceUrl
				}
				front3{
					sourceUrl
				}
			}
			
			
		  }
		}
	  }
	  posts(first: 10) {
		nodes {
		  title
		  date
		  id
		  featuredImage {
			node {
			  altText
			  sourceUrl(size: POST_THUMBNAIL)
			}
		  }
		  uri
		}
	  }
	  caseStudies(first: 10) {
		nodes {
		  id
		  title
		  uri
		  date
		  casesingle {
			card {
			  client
			  comment
			  providedServices {
				text
			  }
			}
		  }
		  featuredImage {
			node {
			  altText
			  sourceUrl(size: POST_THUMBNAIL)
			}
		  }
		}
	  }
	  approachs {
		nodes {
		  id
		  title
		  approachSingle {
			icon
			text
		  }
		}
	  }
	  testimonials {
		nodes {
		  id
		  title
		  uri
		  featuredImage {
			node {
			  altText
			  sourceUrl(size: POST_THUMBNAIL)
			}
		  }
		  testimonialSingle {
			author
			text
			rating
		  }
		}
	  }
	}
	${SeoFragment}
`;