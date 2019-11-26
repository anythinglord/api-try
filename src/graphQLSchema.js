import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

// TYPEDEFS

	// Events
	import {
		eventsMutations,
		eventsQueries,
		eventsTypeDef
	} from './evn/events/EtypeDefs';
	import {
		reservationsMutations,
		reservationsQueries,
		reservationsTypeDef
	} from './evn/reservations/RtypeDefs';

	// Destinations
	import {
		destinationsMutations,
		destinationsQueries,
		destinationsTypeDef
	} from './destinations/DtypeDefs';

	// Register
	import{ 
		usersMutations,
		usersQueries,
		usersTypeDef
	} from './register/RtypeDefs';

	//Lddap
	import {
		ldMutations,
		ldQueries,
		ldTypeDef,
		//ldTypeDef2
	} from './ldap/LDtypeDefs';


	//Promociones
	import{ 
		tiendasMutations,
		tiendasQueries,
		tiendasTypeDef
	} from './promos/tienda/TtypeDefs';
	import{ 
		promocionesMutations,
		promocionesQueries,
		promocionesTypeDef
	} from './promos/promocion/PMtypeDefs';

	// Service
	import{ 
		servicesMutations,
		servicesQueries,
		servicesTypeDef
	} from './service/StypeDefs';

// RESOLVERS

	// Events
	import eventsResolvers from './evn/events/Eresolvers';
	import reservationResolvers from './evn/reservations/Rresolvers';

	// Destinations
	import destinationsResolvers from './destinations/Dresolvers';

	// Register
	import usersResolvers from './register/Rresolvers';

	// Promociones
	import promocionesResolvers from './promos/promocion/PMresolvers';
	import tiendasResolvers from './promos/tienda/Tresolvers';

	// service
	import servicesResolvers from './service/Sresolvers';
	
	// ldap
	import ldResolvers from './ldap/LDresolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		eventsTypeDef,
		destinationsTypeDef,
		promocionesTypeDef,
		tiendasTypeDef,
		reservationsTypeDef,
		ldTypeDef,
		usersTypeDef,
		servicesTypeDef,
		//ldTypeDef2
	],
	[
		eventsQueries,
		destinationsQueries,
		promocionesQueries,
		tiendasQueries,
		reservationsQueries,
		ldQueries,
		usersQueries,
		servicesQueries,
	],
	[
		eventsMutations,
		destinationsMutations,
		promocionesMutations,
		tiendasMutations,
		reservationsMutations,
		ldMutations,
		usersMutations,
		servicesMutations,
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		eventsResolvers,
		destinationsResolvers,
		promocionesResolvers,
		tiendasResolvers,
		reservationResolvers,
		ldResolvers,
		usersResolvers,
		servicesResolvers,
	)
});
