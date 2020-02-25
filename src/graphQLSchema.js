import merge from 'lodash.merge';
import GraphQLJSON from 'graphql-type-json';
import { makeExecutableSchema } from 'graphql-tools';

import { mergeSchemas } from './utilities';

// TYPEDEFS

	// Register
	import{ 
		usersMutations,
		usersQueries,
		usersTypeDef
	} from './register/RtypeDefs';

	/*//Lddap
	import {
		ldMutations,
		ldQueries,
		ldTypeDef,
		//ldTypeDef2
	} from './ldap/LDtypeDefs';*/

	
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

	import{ 
		requestsMutations,
		requestsQueries,
		requestsTypeDef
	} from './request/RtypeDefs';

// RESOLVERS

	
	// Register
	import usersResolvers from './register/Rresolvers';

	// service
	import servicesResolvers from './service/Sresolvers';
	
	// ldap
	import ldResolvers from './ldap/LDresolvers';
	// Alternative 
	import alternativesResolvers from './alternative/Aresolvers';

	import requestsResolvers from './request/Rresolvers';

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
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		//ldResolvers,
		usersResolvers,
		servicesResolvers,
		alternativesResolvers,
		requestsResolvers,
	)
});
