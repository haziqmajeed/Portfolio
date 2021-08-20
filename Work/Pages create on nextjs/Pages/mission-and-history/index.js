import client from 'src/apollo/client';
import Layout from 'src/components/Layout';
import { returnDataOnlyIfNotEmpty } from 'src/utils/slug';
import { GET_MISSION_AND_HISTORY } from 'src/queries/who-we-are/mission-and-history';
import MissionAndHistory from 'src/components/WhoWeAre/MissionAndHistory';
export default function missionAndHistory( {data} ) {
  return (
    <Layout data={data}>
      <MissionAndHistory data={data} />
    </Layout>
  );
}

export async function getStaticProps( context ) {
  const { data, errors } = await client.query( {
    query: GET_MISSION_AND_HISTORY,
    variables: {
      uri: '/who-we-are/',
    },
  } );

  const defaultProps = {
    props: {
      data: data || {}
    },
    revalidate: 5 * 60,
  };

  return returnDataOnlyIfNotEmpty(defaultProps, data, 'pageBy');
}
