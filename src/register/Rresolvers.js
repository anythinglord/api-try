import { generalRequest, getRequest } from '../utilities';
import { url, port,entryPoint, entryPointA } from './Rserver';

const URL = `http://${url}:${port}/${entryPoint}`;
const URLA = `http://${url}:${port}/${entryPointA}`;

const Rresolvers = {
	Query: {
		getUsers: (_) =>
			getRequest(URL, ''),
		userById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
		userByEmail: async (_, { email }) =>{
			let res = await getRequest(URL, email)
			console.log("Res: ",res)
			return res
		},
			
	},
	Mutation: {
		authUser: async (_, { credentials }) => {
			let res = await	generalRequest(`${URLA}`, 'POST', credentials);
			return res
		},
		createUser: (_, { user }) =>
			generalRequest(`${URL}`, 'POST', user),
		updateUser: (_, { id, user }) =>
			generalRequest(`${URL}/${id}`, 'PUT', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default Rresolvers;
