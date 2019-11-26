import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './PMserver';

const URL = `http://${url}:${port}/${entryPoint}`;

const PMresolvers = {
	Query: {
		getPromociones: (_) =>
			getRequest(URL, ''),
		promocionById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),

	},
	Mutation: {
		createPromocion: (_, { promocion }) =>
			generalRequest(`${URL}`, 'POST', promocion),
		updatePromocion: (_, { id, promocion }) =>
			generalRequest(`${URL}/${id}`, 'PUT', promocion),
		deletePromocion: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default PMresolvers;