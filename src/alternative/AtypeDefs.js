export const alternativesTypeDef = `
type Alternative {
    id: Int!
    cost: String
    array_id: String
    array_services: String!
    duration: String
    origin: String
    destination: String
}
type answer3{
    message: String!
}
input AlternativeInput {
    cost: String
    array_id: String
    array_services: String!
    duration: String
    origin: String
    destination: String
}`;

export const alternativesQueries = `
    getAlternatives: [Alternative]!
    AlternativeById(id: Int!): Alternative!
`;

export const alternativesMutations = `
    createAlternative(Alternative: AlternativeInput!): Alternative!
    deleteAlternative(id: Int!): answer3!
    updateAlternative(id: Int!, Alternative: AlternativeInput!): Alternative!
`;
