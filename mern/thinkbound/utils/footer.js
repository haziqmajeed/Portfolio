import client from "../apollo/client";
import { GET_FOOTER } from '../queries/getFooter';

export async function getFooterData() {

    const {data} = await client.query({
      query: GET_FOOTER,
    });
  
    return data
}