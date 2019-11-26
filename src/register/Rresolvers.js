import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint } from './Rserver';

const URL = `http://${url}:${port}/${entryPoint}`;

const Rresolvers = {
	Query: {
		getUsers: (_) =>
			getRequest(URL, ''),
		userById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
		userByEmail: (_, { email }) =>
			getRequest(URL, email),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL}`, 'POST', user),
		updateUser: (_, { id, user }) =>
			generalRequest(`${URL}/${id}`, 'PUT', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default Rresolvers;
