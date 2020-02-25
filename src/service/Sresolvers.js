import { generalRequest, getRequest } from '../utilities';
import { url, entryPoint } from './Sserver';

const URL = `${url}/${entryPoint}`;

const Sresolvers = {
	Query: {
		getServices: (_) =>
			getRequest(URL, ''),
		ServiceById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		createService: (_, { Service }) =>
			generalRequest(`${URL}`, 'POST', Service),
		updateService: (_, { id, Service }) =>
			generalRequest(`${URL}/${id}`, 'PUT', Service),
		deleteService: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default Sresolvers;