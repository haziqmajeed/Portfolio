
import client from "../apollo/client";
import { GET_POSTS } from '../queries/getposts';

/**
 * getAllPosts
 */

export async function getAllPosts() {

  const {data} = await client.query({
    query: GET_POSTS,
  });

  const posts = data.posts.nodes.map(( node) => node);
  const pageBy = data.pageBy;

  return {
    posts,
    pageBy
  };
}

/**
 * getPageCount
 */

export async function getPagesCount(posts, postsPerPage) {
  return Math.ceil(posts.length / postsPerPage);
}

/**
* getPaginatedPosts
*/

export async function getPaginatedPosts(currentPage = 1) {
    const { posts, pageBy } = await getAllPosts();
    const postsPerPage = process.env.NEXT_PUBLIC_POSTS_PER_PAGE
    const pagesCount = await getPagesCount(posts, postsPerPage);
    let page = Number(currentPage);
    if (typeof page === 'undefined' || isNaN(page) || page > pagesCount) {
      page = 1;
    }
    const offset = postsPerPage * (page - 1);

    //console.log('query posts: ', posts)

    return {
      posts,
      pageBy,
      pagination: {
        currentPage: page,
        postsPerPage,
        pagesCount,
      },
    };
}