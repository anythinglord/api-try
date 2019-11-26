export const servicesTypeDef = `
type Service {
    id: Int!
    id_user: Int!
    title: String
    class: String!
    descrip: String!
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
    descrip: String!
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

export const servicesQueries = `
    getServices: [Service]!
    ServiceById(id: Int!): Service!
`;

export const servicesMutations = `
    createService(Service: ServiceInput!): Service!
    deleteService(id: Int!): answer2!
    updateService(id: Int!, Service: ServiceInput!): Service!
`;
