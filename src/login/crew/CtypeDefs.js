export const crewsTypeDef = `
type Crew {
    id: Int!
    id_user: Int!
    dependence: String!
}
input CrewInput {
    id_user: Int!
    dependence: String!
}`;

export const crewsQueries = `
    getCrews: [Crew]!
    CrewById(id: Int!): Crew!
`;

export const crewsMutations = `
    createCrew(crew: CrewInput!): Crew!
    deleteCrew(id: Int!): Int
    updateCrew(id: Int!, Crew: CrewInput!): Crew!
`;