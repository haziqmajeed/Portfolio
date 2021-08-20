import client from 'src/apollo/client';
import GivePopUp from 'src/components/GivePopUp';
import { GET_SITE_OPTION } from 'src/queries/site';
import { returnDataOnlyIfNotEmpty } from 'src/utils/slug';

export default function whoWeAre( {data} ) {
	return (
		<GivePopUp
		  data={data}
		/>
	);
}

export async function getStaticProps( context ) {
	const { data, errors } = await client.query({
		query: GET_SITE_OPTION,
	});

	const defaultProps = {
		props: {
			data: data || {}
		},
		revalidate: 5 * 60,
	};

	return returnDataOnlyIfNotEmpty(defaultProps, data, 'header');
}
