export const usersTypeDef = `
type User {
    id: Int!
    nameE: String!
    email: String!
    rol: String!
    passw: String!
    nit: String!
}
type correct{
    success: Boolean!
    token: String!
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
}
input authInput {
    email: String!
    passw: String!
    
}`;

// type correct 
/*
response cuando el usuario se autentica
*/ 

export const usersQueries = `
    getUsers: [User]!
    userById(id: Int!): User!
    userByEmail(email: String!): User!
`;

export const usersMutations = `
    authUser(credentials: authInput!): correct!
    createUser(user: UserInput!): User!
    deleteUser(id: Int!): answer!
    updateUser(id: Int!, User: UserInput!): User!
`;
//authUser(user: authInput!): correct!