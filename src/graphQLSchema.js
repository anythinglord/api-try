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

	// Alternatives 
	import{ 
		alternativesMutations,
		alternativesQueries,
		alternativesTypeDef
	} from './alternative/AtypeDefs';

// RESOLVERS

	// Events
	import eventsResolvers from './evn/events/Eresolvers';
	import reservationResolvers from './evn/reservations/Rresolvers';

	

	// Register
	import usersResolvers from './register/Rresolvers';

	// Promociones
	import promocionesResolvers from './promos/promocion/PMresolvers';
	import tiendasResolvers from './promos/tienda/Tresolvers';

	// service
	import servicesResolvers from './service/Sresolvers';
	
	// ldap
	import ldResolvers from './ldap/LDresolvers';
	// Alternative 
	import alternativesResolvers from './alternative/Aresolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		eventsTypeDef,
		promocionesTypeDef,
		tiendasTypeDef,
		reservationsTypeDef,
		ldTypeDef,
		usersTypeDef,
		servicesTypeDef,
		alternativesTypeDef,
		//ldTypeDef2
	],
	[
		eventsQueries,
		promocionesQueries,
		tiendasQueries,
		reservationsQueries,
		ldQueries,
		usersQueries,
		servicesQueries,
		alternativesQueries,
	],
	[
		eventsMutations,
		promocionesMutations,
		tiendasMutations,
		reservationsMutations,
		ldMutations,
		usersMutations,
		servicesMutations,
		alternativesMutations,
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		eventsResolvers,
		promocionesResolvers,
		tiendasResolvers,
		reservationResolvers,
		ldResolvers,
		usersResolvers,
		servicesResolvers,
		alternativesResolvers,

	)
});
