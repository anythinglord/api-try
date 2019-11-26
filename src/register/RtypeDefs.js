export const usersTypeDef = `
type User {
    id: Int!
    nameE: String!
    email: String!
    rol: String!
    passw: String!
    nit: String!
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
}`;

export const usersQueries = `
    getUsers: [User]!
    userById(id: Int!): User!
    userByEmail(email: String!): User!
`;

export const usersMutations = `
    createUser(user: UserInput!): User!
    deleteUser(id: Int!): answer!
    updateUser(id: Int!, User: UserInput!): User!
`;
