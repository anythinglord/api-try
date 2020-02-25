import { generalRequest, getRequest } from '../utilities';
import { url, port, entryPoint, savePoint } from './Aserver';

const URL = `http://${url}:${port}/${entryPoint}`;
const URLSave = `http://${url}:${port}/${savePoint}`;

const Aresolvers = {
	Query: {
		getAlternatives: (_) =>
			getRequest(URL, ''),
		AlternativeById: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'GET'),
	},
	Mutation: {
		saveAlternative:(_, { Alternative }) =>
			generalRequest(`${URLSave}`, 'POST', Alternative),
		createAlternative: (_, { Alternative }) =>
			generalRequest(`${URL}`, 'POST', Alternative),
		updateAlternative: (_, { id, Alternative }) =>
			generalRequest(`${URL}/${id}`, 'PUT', Alternative),
		deleteAlternative: (_, { id }) =>
			generalRequest(`${URL}/${id}`, 'DELETE')
	}
};

export default Aresolvers;