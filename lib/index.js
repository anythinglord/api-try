'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Koa = _interopDefault(require('koa'));
var KoaRouter = _interopDefault(require('koa-router'));
var koaLogger = _interopDefault(require('koa-logger'));
var koaBody = _interopDefault(require('koa-bodyparser'));
var koaCors = _interopDefault(require('@koa/cors'));
var apolloServerKoa = require('apollo-server-koa');
var merge = _interopDefault(require('lodash.merge'));
var GraphQLJSON = _interopDefault(require('graphql-type-json'));
var graphqlTools = require('graphql-tools');
var request = _interopDefault(require('request-promise-native'));
var graphql = require('graphql');

/**
 * Creates a request following the given parameters
 * @param {string} url
 * @param {string} method
 * @param {object} [body]
 * @param {boolean} [fullResponse]
 * @return {Promise.<*>} - promise with the error or the response object
 */
async function generalRequest(url, method, body, fullResponse) {
	const parameters = {
		method,
		uri: encodeURI(url),
		body,
		json: true,
		resolveWithFullResponse: fullResponse
	};
	if (process.env.SHOW_URLS) {
		// eslint-disable-next-line
		console.log(url);
	}

	try {
		return await request(parameters);
	} catch (err) {
		return err;
	}
}

/**
 * Adds parameters to a given route
 * @param {string} url
 * @param {object} parameters
 * @return {string} - url with the added parameters
 */
function addParams(url, parameters) {
	let queryUrl = `${url}?`;
	for (let param in parameters) {
		// check object properties
		if (
			Object.prototype.hasOwnProperty.call(parameters, param) &&
			parameters[param]
		) {
			if (Array.isArray(parameters[param])) {
				queryUrl += `${param}=${parameters[param].join(`&${param}=`)}&`;
			} else {
				queryUrl += `${param}=${parameters[param]}&`;
			}
		}
	}
	return queryUrl;
}

/**
 * Generates a GET request with a list of query params
 * @param {string} url
 * @param {string} path
 * @param {object} parameters - key values to add to the url path
 * @return {Promise.<*>}
 */
function getRequest(url, path, parameters) {
	const queryUrl = addParams(`${url}/${path}`, parameters);
	return generalRequest(queryUrl, 'GET');
}

/**
 * Merge the schemas in order to avoid conflicts
 * @param {Array<string>} typeDefs
 * @param {Array<string>} queries
 * @param {Array<string>} mutations
 * @return {string}
 */
function mergeSchemas(typeDefs, queries, mutations) {
	return `${typeDefs.join('\n')}
    type Query { ${queries.join('\n')} }
    type Mutation { ${mutations.join('\n')} }`;
}

function formatErr(error) {
	const data = graphql.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const usersTypeDef = `
type User {
    id: Int!
    nameE: String!
    email: String!
    rol: String!
    passw: String!
    nit: String!
}
type correct{
    success: Boolean!
    token: String!
}
type answer{
    message: String!
}
input UserInput {
    nameE: String!
    email: String!
    rol: String!
    passw: String!
    nit: String!
}
input authInput {
    email: String!
    passw: String!
    
}`;

// type correct 
/*
response cuando el usuario se autentica
*/ 

const usersQueries = `
    getUsers: [User]!
    userById(id: Int!): User!
    userByEmail(email: String!): User!
`;

const usersMutations = `
    authUser(credentials: authInput!): correct!
    createUser(user: UserInput!): User!
    deleteUser(id: Int!): answer!
    updateUser(id: Int!, User: UserInput!): User!
`;
//authUser(user: authInput!): correct!

const servicesTypeDef = `
type Service {
    id: Int!
    id_user: Int!
    title: String
    class: String!
    capacity: Int!
    places: Int!
    cost: String!
    origin :String!
    destination :String!
    transport :String!
    ubication :String!
    date_start: String!
    date_end: String!

}
type answer2{
    message: String!
}
input ServiceInput {
    id_user: Int!
    title: String
    class: String!
    capacity: Int!
    places: Int!
    cost: String!
    origin :String!
    destination :String!
    transport :String!
    ubication :String!
    date_start: String!
    date_end: String!
}`;

const servicesQueries = `
    getServices: [Service]!
    ServiceById(id: Int!): Service!
`;

const servicesMutations = `
    createService(Service: ServiceInput!): Service!
    deleteService(id: Int!): answer2!
    updateService(id: Int!, Service: ServiceInput!): Service!
`;

const alternativesTypeDef = `
type Alternative {
    id: Int!
    cost: String
    array_id: String
    array_services: String!
    duration: String
    origin: String
    destination: String
}
type answer3{
    message: String!
}
input AlternativeInput {
    cost: String
    array_id: String
    array_services: String!
    duration: String
    origin: String
    destination: String
}
input RouteInput{
    origin: String!
    destination: String!
}
`;

const alternativesQueries = `
    getAlternatives: [Alternative]!
    AlternativeById(id: Int!): Alternative!
`;

const alternativesMutations = `
    saveAlternative(Route: RouteInput): Alternative!
    createAlternative(Alternative: AlternativeInput!): Alternative!
    deleteAlternative(id: Int!): answer3!
    updateAlternative(id: Int!, Alternative: AlternativeInput!): Alternative!
`;

const requestsTypeDef = `
type Request {
    id: Int!
    id_user: Int!
    id_owner: Int!
    id_service: Int!
    title: String!
    body: String!
    accept: String!

}
type answer4{
    message: String!
}
input RequestInput {
    id_user: Int!
    id_owner: Int!
    id_service: Int!
    title: String!
    body: String!
    accept: String!
}`;

const requestsQueries = `
    getRequests: [Request]!
    RequestById(id: Int!): Request!
`;

const requestsMutations = `
    createRequest(Request: RequestInput!): Request!
    deleteRequest(id: Int!): answer4!
    updateRequest(id: Int!, Request: RequestInput!): Request!
`;

const url = process.env.USERS_URL;

const entryPoint = process.env.USERS_ENTRY;
const entryPointA = process.env.USERS_ENTRYA;

const URL = `${url}/${entryPoint}`;
const URLA = `${url}/${entryPointA}`;

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

const url$1 = process.env.SERVICES_URL;

const entryPoint$1 = process.env.SERVICES_ENTRY;

const URL$1 = `${url$1}/${entryPoint$1}`;

const Sresolvers = {
	Query: {
		getServices: (_) =>
			getRequest(URL$1, ''),
		ServiceById: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'GET'),
	},
	Mutation: {
		createService: (_, { Service }) =>
			generalRequest(`${URL$1}`, 'POST', Service),
		updateService: (_, { id, Service }) =>
			generalRequest(`${URL$1}/${id}`, 'PUT', Service),
		deleteService: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'DELETE')
	}
};

// autenticar usuarios

// autenticar administradores

// agregar usuarios

// agregar administradores

// verificar Token

const url$3 = process.env.ALTERNATIVES_URL;

const entryPoint$2 = process.env.ALTERNATIVES_ENTRY;
const savePoint = process.env.SAVEALTER_ENTRY;

const URL$2 = `${url$3}/${entryPoint$2}`;
const URLSave = `${url$3}/${savePoint}`;

const Aresolvers = {
	Query: {
		getAlternatives: (_) =>
			getRequest(URL$2, ''),
		AlternativeById: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'GET'),
	},
	Mutation: {
		saveAlternative:(_, { Alternative }) =>
			generalRequest(`${URLSave}`, 'POST', Alternative),
		createAlternative: (_, { Alternative }) =>
			generalRequest(`${URL$2}`, 'POST', Alternative),
		updateAlternative: (_, { id, Alternative }) =>
			generalRequest(`${URL$2}/${id}`, 'PUT', Alternative),
		deleteAlternative: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'DELETE')
	}
};

const url$4 = process.env.REQUEST_URL;

const entryPoint$3 = process.env.REQUEST_ENTRY;

const URL$3 = `${url$4}/${entryPoint$3}`;

const Rresolvers$1 = {
	Query: {
		getRequests: (_) =>
			getRequest(URL$3, ''),
		RequestById: (_, { id }) =>
			generalRequest(`${URL$3}/${id}`, 'GET'),
	},
	Mutation: {
		createRequest: (_, { Request }) =>
			generalRequest(`${URL$3}`, 'POST', Request),
		updateRequest: (_, { id, Request }) =>
			generalRequest(`${URL$3}/${id}`, 'PUT', Request),
		deleteRequest: (_, { id }) =>
			generalRequest(`${URL$3}/${id}`, 'DELETE')
	}
};

// TYPEDEFS

	// Register
	/*//Lddap
	import {
		ldMutations,
		ldQueries,
		ldTypeDef,
		//ldTypeDef2
	} from './ldap/LDtypeDefs';*/

	
	// Service
	// Alternatives 
	// RESOLVERS

	
	// Register
	// service
	// ldap
	// Alternative 
	// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		//ldTypeDef,
		usersTypeDef,
		servicesTypeDef,
		alternativesTypeDef,
		requestsTypeDef,
		//ldTypeDef2
	],
	[
		//ldQueries,
		usersQueries,
		servicesQueries,
		alternativesQueries,
		requestsQueries,
	],
	[
		//ldMutations,
		usersMutations,
		servicesMutations,
		alternativesMutations,
		requestsMutations,
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		//ldResolvers,
		Rresolvers,
		Sresolvers,
		Aresolvers,
		Rresolvers$1,
	)
});

const app = new Koa();
const router = new KoaRouter();
const PORT = process.env.PORT || 5000;

app.use(koaLogger());
app.use(koaCors());

// read token from header
app.use(async (ctx, next) => {
	if (ctx.header.authorization) {
		const token = ctx.header.authorization.match(/Bearer ([A-Za-z0-9]+)/);
		if (token && token[1]) {
			ctx.state.token = token[1];
		}
	}
	await next();
});

// GraphQL
const graphql$1 = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql$1);
router.get('/graphql', graphql$1);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
