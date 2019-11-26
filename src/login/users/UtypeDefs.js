export const usersTypeDef = `
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

export const usersQueries = `
    getUsers: [User]!
    userById(id: Int!): User!
    userByUsername(username: String!): User!
`;

export const usersMutations = `
    createUser(user: UserInput!): User!
    deleteUser(id: Int!): Int!
    updateUser(id: Int!, User: UserInput!): User!
`;