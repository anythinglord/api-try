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
var graphql$1 = require('graphql');

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
	const data = graphql$1.formatError(error);
	const { originalError } = error;
	if (originalError && originalError.error) {
		const { path } = data;
		const { error: { id: message, code, description } } = originalError;
		return { message, code, description, path };
	}
	return data;
}

const eventsTypeDef = `
type Event{
    id: Int!
    name: String!
    location: String!
    date: String!
    capacity: Int!
    audence: String!
    description: String!
    tipo: String!
}
type Event2{
    name: String!
    location: String!
    date: String!
    capacity: Int!
    audence: String!
    description: String!
    tipo: String!
}
input EventInput {
    name: String!
    location: String!
    date: String!
    capacity: Int!
    audence: String!
    description: String!
    tipo: String!
}`;

const eventsQueries = `
    getEvents: [Event]!
    eventById(id: Int!): Event!
`;

const eventsMutations = `
    createEvent(event: EventInput!): Event2!
    deleteEvent(id: Int!): Int!
    updateEvent(id: Int!, event: EventInput!): Event!
`;

const reservationsTypeDef = `
type Reservation {
    id: Int!
    quantity: Int!
    id_user: Int!
    id_event: Int!
}
type Reservation2 {
    quantity: Int!
    id_user: Int!
    id_event: Int!
}
input ReservationInput {
    quantity: Int!
    id_user: Int!
    id_event: Int!
}`;

const reservationsQueries = `
    getReservations: [Reservation]!
    reservationById(id: Int!): Reservation!
`;

const reservationsMutations = `
    createReservation(reservation: ReservationInput!): Reservation2!
    deleteReservation(id: Int!): Int!
    updateReservation(id: Int!, reservation: ReservationInput!): Reservation!
`;

const destinationsTypeDef = `
type Destination {
    id: Int!
    name: String!
    weather: String!
    description: String!
    timezone: String!
    cityimage: String!
    landingtime: String!
    boardingtime: String!
}
input DestinationInput {
    name: String!
    weather: String!
    description: String!
    timezone: String!
    cityimage: String!
    landingtime: String!
    boardingtime: String!
    }`;

const destinationsQueries = `
    getDestinations: [Destination]!
    destinationById(id: Int!): Destination!
`;

const destinationsMutations = `
    createDestination(destination: DestinationInput!): Destination!
    deleteDestination(id: Int!): String!
    updateDestination(id: Int!, destination: DestinationInput!): Destination!
`;

const usersTypeDef = `
type User {
    id: Int!
    uname: String!
    surname: String!
    email: String!
    passw: String!
}
input UserInput {
    uname: String!
    surname: String!
    email: String!
    passw: String!
}`;

const usersQueries = `
    getUsers: [User]!
    userById(id: Int!): User!
    userByUsername(username: String!): User!
`;

const usersMutations = `
    createUser(user: UserInput!): User!
    deleteUser(id: Int!): Int!
    updateUser(id: Int!, User: UserInput!): User!
`;

const crewsTypeDef = `
type Crew {
    id: Int!
    id_user: Int!
    dependence: String!
}
input CrewInput {
    id_user: Int!
    dependence: String!
}`;

const crewsQueries = `
    getCrews: [Crew]!
    CrewById(id: Int!): Crew!
`;

const crewsMutations = `
    createCrew(crew: CrewInput!): Crew!
    deleteCrew(id: Int!): Int
    updateCrew(id: Int!, Crew: CrewInput!): Crew!
`;

const passengersTypeDef = `
type Passenger {
    id: Int!
    id_user: Int!
    birthdate: String!
    email: String!
    phone: String!
}
input PassengerInput {
    id_user: Int!
    birthdate: String!
    email: String!
    phone: String!
}`;

const passengersQueries = `
    getPassengers: [Passenger]!
    passengerById(id: Int!): Passenger!
`;

const passengersMutations = `
    createPassenger(passenger: PassengerInput!): Passenger!
    deletePassenger(id: Int!): Int!
    updatePassenger(id: Int!, passenger: PassengerInput!): Passenger!
`;

const ldTypeDef = `
type response {
    success: String!
    data: String!
}
type correct{
    success: Boolean!
    data: String!
    token: String!
}
type only{
    message: String!
}
input UserInput2 {
    uname: String!
    surname: String!
    email: String!
    passw: String!
}
input Token{
    token: String
}
input LoginInput {
    email: String!
    password: String!
}`;


const ldQueries = `
`;

const ldMutations = `
    loginUser(credentials: LoginInput!): correct!
    loginAdmin(credentials: LoginInput!): correct!
    createUserld(user: UserInput2!): response!
    createAdmin(user: UserInput2!): response!
    validate(credentials: Token): only!
`;

const tiendasTypeDef = `
type Tienda {
    id_tienda: Int!
    categoria: String!
    ubicacion: String!
    nombre: String!
}
type Tienda2 {
    categoria: String!
    ubicacion: String!
    nombre: String!
}
input TiendaInput {
    categoria: String!
    ubicacion: String!
    nombre: String!
}`;

const tiendasQueries = `
    getTiendas: [Tienda]!
    tiendaById(id: Int!): Tienda!
`;

const tiendasMutations = `
    createTienda(tienda: TiendaInput!): Tienda2!
    deleteTienda(id: Int!): Int
    updateTienda(id: Int!, Tienda: TiendaInput!): Tienda!
`;

const promocionesTypeDef = `
type Promocion {
    id_promocion: Int!
    id_tienda: Int!
    descripcion: String!
    fecha_inicio: String!
    fecha_fin: String!
}
type Promocion2 {
    id_tienda: Int!
    descripcion: String!
    fecha_inicio: String!
    fecha_fin: String!
}
input PromocionInput {
    id_tienda: Int!
    descripcion: String!
    fecha_inicio: String!
    fecha_fin: String!
}`;

const promocionesQueries = `
    getPromociones: [Promocion]!
    promocionById(id: Int!): Promocion!
`;

const promocionesMutations = `
    createPromocion(promocion: PromocionInput!): Promocion!
    deletePromocion(id: Int!): Int
    updatePromocion(id: Int!, Promocion: PromocionInput!): Promocion!
`;

const notificationsTypeDef = `
type Notification {
    id_persona: Int!
    tipo: String!
    medio: String!
    titulo: String!
    descripcion: String!
}
input NotificationInput {
    id_persona: Int!
    tipo: String!
    medio: String!
    titulo: String!
    descripcion: String!
}`;

const notificationsQueries = `
    getNotifications: [Notification]!
    notificationById(id: Int!): Notification!
`;

const notificationsMutations = `
    createNotification(Notification: NotificationInput!): Notification!
    deleteNotification(id: Int!): Int
    updateNotification(id: Int!, Notification: NotificationInput!): Notification!
`;

const url = process.env.EVENTS_URL;
const port = process.env.EVENTS_PORT;
const entryPoint = process.env.EVENTS_ENTRY;

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

const url$1 = process.env.RESERVATIONS_URL;
const port$1 = process.env.RESERVATIONS_PORT;
const entryPoint$1 = process.env.RESERVATIONS_ENTRY;

const URL$1 = `http://${url$1}:${port$1}/${entryPoint$1}`;

const Rresolvers = {
	Query: {
		getReservations: (_) =>
			getRequest(URL$1, ''),
		reservationById: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'GET'),

	},
	Mutation: {
		createReservation: (_, { reservation }) =>
			generalRequest(`${URL$1}`, 'POST', reservation),
		updateReservation: (_, { id, reservation }) =>
			generalRequest(`${URL$1}/${id}`, 'PUT', reservation),
		deleteReservation: (_, { id }) =>
			generalRequest(`${URL$1}/${id}`, 'DELETE')
	}
};

const url$2 = process.env.DESTINATIONS_URL;
const port$2 = process.env.DESTINATIONS_PORT;
const entryPoint$2 = process.env.DESTINATIONS_ENTRY;

const URL$2 = `http://${url$2}:${port$2}/${entryPoint$2}`;

const Dresolvers = {
	Query: {
		getDestinations: (_) =>
			getRequest(URL$2, ''),
		destinationById: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'GET'),

	},
	Mutation: {
		createDestination: (_, { destination }) =>
			generalRequest(`${URL$2}`, 'POST', destination),
		updateDestination: (_, { id, destination }) =>
			generalRequest(`${URL$2}/${id}`, 'PUT', destination),
		deleteDestination: (_, { id }) =>
			generalRequest(`${URL$2}/${id}`, 'DELETE')
	}
};

const url$3 = process.env.USERS_URL;
const port$3 = process.env.USERS_PORT;
const entryPoint$3 = process.env.USERS_ENTRY;

const URL$3 = `http://${url$3}:${port$3}/${entryPoint$3}`;

const Uresolvers = {
	Query: {
		getUsers: (_) =>
			getRequest(URL$3, ''),
		userById: (_, { id }) =>
			generalRequest(`${URL$3}/${id}`, 'GET'),
		userByUsername: (_, { username }) =>
			getRequest(URL$3, username),
	},
	Mutation: {
		createUser: (_, { user }) =>
			generalRequest(`${URL$3}`, 'POST', user),
		updateUser: (_, { id, user }) =>
			generalRequest(`${URL$3}/${id}`, 'PUT', user),
		deleteUser: (_, { id }) =>
			generalRequest(`${URL$3}/${id}`, 'DELETE')
	}
};

const url$4 = process.env.CREWS_URL;
const port$4 = process.env.CREWS_PORT;
const entryPoint$4 = process.env.CREWS_ENTRY;

const URL$4 = `http://${url$4}:${port$4}/${entryPoint$4}`;

const Cresolvers = {
	Query: {
		getCrews: (_) =>
			getRequest(URL$4, ''),
		CrewById: (_, { id }) =>
			generalRequest(`${URL$4}/${id}`, 'GET'),

	},
	Mutation: {
		createCrew: (_, { crew }) =>
			generalRequest(`${URL$4}`, 'POST', crew),
		updateCrew: (_, { id, crew }) =>
			generalRequest(`${URL$4}/${id}`, 'PUT', crew),
		deleteCrew: (_, { id }) =>
			generalRequest(`${URL$4}/${id}`, 'DELETE')
	}
};

const url$5 = process.env.PASSENGERS_URL;
const port$5 = process.env.PASSENGERS_PORT;
const entryPoint$5 = process.env.PASSENGERS_ENTRY;

const URL$5 = `http://${url$5}:${port$5}/${entryPoint$5}`;

const Presolvers = {
	Query: {
		getPassengers: (_) =>
			getRequest(URL$5, ''),
		passengerById: (_, { id }) =>
			generalRequest(`${URL$5}/${id}`, 'GET'),

	},
	Mutation: {
		createPassenger: (_, { passenger }) =>
			generalRequest(`${URL$5}`, 'POST', passenger),
		updatePassenger: (_, { id, passenger }) =>
			generalRequest(`${URL$5}/${id}`, 'PUT', passenger),
		deletePassenger: (_, { id }) =>
			generalRequest(`${URL$5}/${id}`, 'DELETE')
	}
};

const url$6 = process.env.PROMOCIONES_URL;
const port$6 = process.env.PROMOCIONES_PORT;
const entryPoint$6 = process.env.PROMOCIONES_ENTRY;

const URL$6 = `http://${url$6}:${port$6}/${entryPoint$6}`;

const PMresolvers = {
	Query: {
		getPromociones: (_) =>
			getRequest(URL$6, ''),
		promocionById: (_, { id }) =>
			generalRequest(`${URL$6}/${id}`, 'GET'),

	},
	Mutation: {
		createPromocion: (_, { promocion }) =>
			generalRequest(`${URL$6}`, 'POST', promocion),
		updatePromocion: (_, { id, promocion }) =>
			generalRequest(`${URL$6}/${id}`, 'PUT', promocion),
		deletePromocion: (_, { id }) =>
			generalRequest(`${URL$6}/${id}`, 'DELETE')
	}
};

const url$7 = process.env.TIENDAS_URL;
const port$7 = process.env.TIENDAS_PORT;
const entryPoint$7 = process.env.TIENDAS_ENTRY;

const URL$7 = `http://${url$7}:${port$7}/${entryPoint$7}`;

const Tresolvers = {
	Query: {
		getTiendas: (_) =>
			getRequest(URL$7, ''),
		tiendaById: (_, { id }) =>
			getRequest(URL$7, id),

	},
	Mutation: {
		createTienda: (_, { tienda }) =>
			generalRequest(`${URL$7}`, 'POST', tienda),
		updateTienda: (_, { id, tienda }) =>
			generalRequest(`${URL$7}/${id}`, 'PUT', tienda),
		deleteTienda: (_, { id }) =>
			generalRequest(`${URL$7}/${id}`, 'DELETE')
	}
};

const url$8 = process.env.NOTIFICATIONS_URL;
const port$8 = process.env.NOTIFICATIONS_PORT;
const entryPoint$8 = process.env.NOTIFICATIONS_ENTRY;

const URL$8 = `http://${url$8}:${port$8}/${entryPoint$8}`;

const Nresolvers = {
	Query: {
		getNotifications: (_) =>
			getRequest(URL$8, ''),
		notificationById: (_, { id }) =>
			generalRequest(`${URL$8}/${id}`, 'GET'),

	},
	Mutation: {
		createNotification: (_, { notification }) =>
			generalRequest(`${URL$8}`, 'POST', notification),
		updateNotification: (_, { id, notification }) =>
			generalRequest(`${URL$8}/${id}`, 'PUT', notification),
		deleteNotification: (_, { id }) =>
			generalRequest(`${URL$8}/${id}`, 'DELETE')
	}
};

const url$9 = process.env.LDAP_URL;
const port$9 = process.env.LDAP_PORT;
// autenticar usuarios
const entryPointA = process.env.LDAP_ENTRYA;
// autenticar administradores
const entryPointAa = process.env.LDAP_ENTRYAa;
// agregar usuarios
const entryPointAd = process.env.LDAP_ENTRYAd;
// agregar administradores
const entryPointAda = process.env.LDAP_ENTRYAda;
// verificar Token
const entryPointV = process.env.LDAP_ENTRYV;

const URLA = `http://${url$9}:${port$9}/${entryPointA}`;
const URLAa = `http://${url$9}:${port$9}/${entryPointAa}`;
const URLAd = `http://${url$9}:${port$9}/${entryPointAd}`;
const URLAda = `http://${url$9}:${port$9}/${entryPointAda}`;
const URLV = `http://${url$9}:${port$9}/${entryPointV}`;


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
			let res = await	generalRequest(`${URLAa}`, 'POST', credentials);
			return res
		},
		createUserld: (_, { user }) =>
			generalRequest(`${URLAd}`, 'POST', user),
		createAdmin: (_, { user }) =>
			generalRequest(`${URLAda}`, 'POST', user),
		
		validate: async (_, { credentials }) => {
			let res = await	generalRequest(`${URLV}`, 'POST', credentials);
			return res
		}	
	}
};

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		eventsTypeDef,
		destinationsTypeDef,
		usersTypeDef,
		crewsTypeDef,
		passengersTypeDef,
		promocionesTypeDef,
		tiendasTypeDef,
		reservationsTypeDef,
		notificationsTypeDef,
		ldTypeDef,
		//ldTypeDef2
	],
	[
		eventsQueries,
		destinationsQueries,
		usersQueries,
		crewsQueries,
		passengersQueries,
		promocionesQueries,
		tiendasQueries,
		reservationsQueries,
		notificationsQueries,
		ldQueries
	],
	[
		eventsMutations,
		destinationsMutations,
		usersMutations,
		crewsMutations,
		passengersMutations,
		promocionesMutations,
		tiendasMutations,
		reservationsMutations,
		notificationsMutations,
		ldMutations
	]
);

// Generate the schema object from your types definition.
var graphQLSchema = graphqlTools.makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		Eresolvers,
		Dresolvers,
		Uresolvers,
		Cresolvers,
		Presolvers,
		PMresolvers,
		Tresolvers,
		Rresolvers,
		Nresolvers,
		LDresolvers
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
const graphql = apolloServerKoa.graphqlKoa((ctx) => ({
	schema: graphQLSchema,
	context: { token: ctx.state.token },
	formatError: formatErr
}));
router.post('/graphql', koaBody(), graphql);
router.get('/graphql', graphql);

// test route
router.get('/graphiql', apolloServerKoa.graphiqlKoa({ endpointURL: '/graphql' }));

app.use(router.routes());
app.use(router.allowedMethods());
// eslint-disable-next-line
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
