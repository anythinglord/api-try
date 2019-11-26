import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './Nserver';

const URL = `http://${url}:${port}/${entryPoint}`;

const Nresolvers = {
	Query: {
		getNotifications: (_) =>
			getRequest(URL, ''),
		notificationById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),

	},
	Mutation: {
		createNotification: (_, { notification }) =>
			generalRequest(`${URL}`, 'POST', notification),
		updateNotification: (_, { id, notification }) =>
			generalRequest(`${URL}/${id}`, 'PUT', notification),
		deleteNotification: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default Nresolvers;