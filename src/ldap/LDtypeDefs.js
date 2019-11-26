export const ldTypeDef = `
type response {
    success: String!
    data: String!
}
type correct{
    success: Boolean!
    data: String!
    token: String!
}
type only{
    message: String!
}
input UserInput2 {
    names: String!
    email: String!
    passw: String!
}
input Token{
    token: String
}
input LoginInput {
    email: String!
    password: String!
}`;


export const ldQueries = `
`;

export const ldMutations = `
    loginUser(credentials: LoginInput!): correct!
    loginAdmin(credentials: LoginInput!): correct!
    createUserld(user: UserInput2!): response!
    createAdmin(user: UserInput2!): response!
    validate(credentials: Token): only!
`;