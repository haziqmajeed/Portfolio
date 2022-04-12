import client from "../apollo/client";
import { GET_HEADER } from '../queries/getHeader';

export async function getHeaderData() {

    const {data} = await client.query({
      query: GET_HEADER,
    });
  
    return data
}