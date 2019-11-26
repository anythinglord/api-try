import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './Rserver';

const URL = `http://${url}:${port}/${entryPoint}`;

const Rresolvers = {
	Query: {
		getReservations: (_) =>
			getRequest(URL, ''),
		reservationById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),

	},
	Mutation: {
		createReservation: (_, { reservation }) =>
			generalRequest(`${URL}`, 'POST', reservation),
		updateReservation: (_, { id, reservation }) =>
			generalRequest(`${URL}/${id}`, 'PUT', reservation),
		deleteReservation: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default Rresolvers;