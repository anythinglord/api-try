import { generalRequest, getRequest } from '../../utilities';
import { url, port, entryPoint } from './Userver';

const URL = `http://${url}:${port}/${entryPoint}`;

const Uresolvers = {
	Query: {
		getUsers: (_) =>
			getRequest(URL, ''),
		userById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
		userByUsername: (_, { username }) =>
			getRequest(URL, username),
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

export default Uresolvers;