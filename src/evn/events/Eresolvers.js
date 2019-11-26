import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './Eserver';

const URL = `http://${url}:${port}/${entryPoint}`;

const Eresolvers = {
	Query: {
		getEvents: (_) =>
			getRequest(URL, ''),
		eventById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),

	},
	Mutation: {
		createEvent: (_, { event }) =>
			generalRequest(`${URL}`, 'POST', event),
		updateEvent: (_, { id, event }) =>
			generalRequest(`${URL}/${id}`, 'PUT', event),
		deleteEvent: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default Eresolvers;