export const eventsTypeDef = `
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

export const eventsQueries = `
    getEvents: [Event]!
    eventById(id: Int!): Event!
`;

export const eventsMutations = `
    createEvent(event: EventInput!): Event2!
    deleteEvent(id: Int!): Int!
    updateEvent(id: Int!, event: EventInput!): Event!
`;