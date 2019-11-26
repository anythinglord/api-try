import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPointA, entryPointAa,entryPointAd,entryPointAda,entryPointV } from './LDserver';

const URLA = `http://${url}:${port}/${entryPointA}`;
const URLAa = `http://${url}:${port}/${entryPointAa}`;
const URLAd = `http://${url}:${port}/${entryPointAd}`;
const URLAda = `http://${url}:${port}/${entryPointAda}`;
const URLV = `http://${url}:${port}/${entryPointV}`;


//const URL = `http://${url}:${port}/${entryPoint}`;

const LDresolvers = {
	Query: {
	},
	Mutation: {
		loginUser: async (_, { credentials }) => {
			let res = await	generalRequest(`${URLA}`, 'POST', credentials);
			return res
		},
		loginAdmin: async (_, { credentials }) => {
			let res = await	generalRequest(`${URLAa}`, 'POST', credentials)
			return res
		},
		createUserld: (_, { user }) =>
			generalRequest(`${URLAd}`, 'POST', user),
		createAdmin: (_, { user }) =>
			generalRequest(`${URLAda}`, 'POST', user),
		
		validate: async (_, { credentials }) => {
			let res = await	generalRequest(`${URLV}`, 'POST', credentials)
			return res
		}	
	}
};

export default LDresolvers;