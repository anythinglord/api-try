import { generalRequest, getRequest } from '../utilities';
import { url, entryPoint } from './Rserver';

const URL = `http://${url}:${port}/${entryPoint}`;

const Rresolvers = {
	Query: {
		getRequests: (_) =>
			getRequest(URL, ''),
		RequestById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createRequest: (_, { Request }) =>
			generalRequest(`${URL}`, 'POST', Request),
		updateRequest: (_, { id, Request }) =>
			generalRequest(`${URL}/${id}`, 'PUT', Request),
		deleteRequest: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default Rresolvers;