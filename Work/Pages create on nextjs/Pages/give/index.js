import client from 'src/apollo/client';
import Layout from 'src/components/Layout';
import { GET_GIVE } from 'src/queries/give/give';
import { returnDataOnlyIfNotEmpty } from 'src/utils/slug';
import Give from 'src/components/Give/index';

export default function staff( {data} ) {
	return (
		<Layout data={data}>
			<Give data={data}/>
		</Layout>
	);
}

export async function getStaticProps( context ) {
	const { data, errors } = await client.query( {
		query: GET_GIVE,
		variables: {
			uri: '/give',
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
