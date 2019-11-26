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
	
	//Lddap
	import {
		ldMutations,
		ldQueries,
		ldTypeDef,
		//ldTypeDef2
	} from './ldap/LDtypeDefs';

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

	
	// Register
	import usersResolvers from './register/Rresolvers';
	
	// ldap
	import ldResolvers from './ldap/LDresolvers';
	
	// Service
	import servicesResolvers from './service/Sresolvers';
	
	// Alternative 
	import alternativesResolvers from './alternative/Aresolvers';

// merge the typeDefs
const mergedTypeDefs = mergeSchemas(
	[
		'scalar JSON',
		usersTypeDef,
		servicesTypeDef,
		alternativesTypeDef,
		ldTypeDef,
		
	],
	[
		usersQueries,
		servicesQueries,
		alternativesQueries,
		ldQueries
	],
	[
		
		usersMutations,
		servicesMutations,
		alternativesMutations,
		ldMutations
	]
);

// Generate the schema object from your types definition.
export default makeExecutableSchema({
	typeDefs: mergedTypeDefs,
	resolvers: merge(
		{ JSON: GraphQLJSON }, // allows scalar JSON
		usersResolvers,
		servicesResolvers,
		alternativesResolvers,
		ldResolvers
	)
});
