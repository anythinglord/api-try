import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './Cserver';

const URL = `http://${url}:${port}/${entryPoint}`;

const Cresolvers = {
	Query: {
		getCrews: (_) =>
			getRequest(URL, ''),
		CrewById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),

	},
	Mutation: {
		createCrew: (_, { crew }) =>
			generalRequest(`${URL}`, 'POST', crew),
		updateCrew: (_, { id, crew }) =>
			generalRequest(`${URL}/${id}`, 'PUT', crew),
		deleteCrew: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default Cresolvers;