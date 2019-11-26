import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './Aserver';

const URL = `http://${url}:${port}/${entryPoint}`;

const Aresolvers = {
	Query: {
		getAlternatives: (_) =>
			getRequest(URL, ''),
		AlternativeById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createAlternative: (_, { Alternative }) =>
			generalRequest(`${URL}`, 'POST', Alternative),
		updateAlternative: (_, { id, Alternative }) =>
			generalRequest(`${URL}/${id}`, 'PUT', Alternative),
		deleteAlternative: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default Aresolvers;