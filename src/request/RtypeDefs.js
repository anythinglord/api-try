export const requestsTypeDef = `
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

export const requestsQueries = `
    getRequests: [Request]!
    RequestById(id: Int!): Request!
`;

export const requestsMutations = `
    createRequest(Request: RequestInput!): Request!
    deleteRequest(id: Int!): answer4!
    updateRequest(id: Int!, Request: RequestInput!): Request!
`;
