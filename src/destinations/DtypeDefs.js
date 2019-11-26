export const destinationsTypeDef = `
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

export const destinationsQueries = `
    getDestinations: [Destination]!
    destinationById(id: Int!): Destination!
`;

export const destinationsMutations = `
    createDestination(destination: DestinationInput!): Destination!
    deleteDestination(id: Int!): String!
    updateDestination(id: Int!, destination: DestinationInput!): Destination!
`;
