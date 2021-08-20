import client from 'src/apollo/client';
import Layout from 'src/components/Layout';
import Partner from 'src/components/WhoWeAre/Partner';
import { GET_PARTNER } from 'src/queries/who-we-are/partner';
import { returnDataOnlyIfNotEmpty } from 'src/utils/slug';

export default function partner( {data} ) {
	return (
		<Layout data={data}>
			<Partner data={data} />
		</Layout>
	);
}

export async function getStaticProps( context ) {
	const { data, errors } = await client.query( {
		query: GET_PARTNER,
		variables: {
			uri: '/partner',
		},
	} );

	const defaultProps = {
		props: {
			data: data || {}
		},
		/**
		 * Revalidate means that if a new request comes to server, then every 1 sec it will check
		 * if the data is changed, if it is changed then it will update the
		 * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
		 */
		revalidate: 5 * 60,
	};

	return returnDataOnlyIfNotEmpty(defaultProps, data, 'pageBy');
}
