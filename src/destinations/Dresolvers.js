import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './Dserver';

const URL = `http://${url}:${port}/${entryPoint}`;

const Dresolvers = {
	Query: {
		getDestinations: (_) =>
			getRequest(URL, ''),
		destinationById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),

	},
	Mutation: {
		createDestination: (_, { destination }) =>
			generalRequest(`${URL}`, 'POST', destination),
		updateDestination: (_, { id, destination }) =>
			generalRequest(`${URL}/${id}`, 'PUT', destination),
		deleteDestination: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default Dresolvers;