export const tiendasTypeDef = `
type Tienda {
    id_tienda: Int!
    categoria: String!
    ubicacion: String!
    nombre: String!
}
type Tienda2 {
    categoria: String!
    ubicacion: String!
    nombre: String!
}
input TiendaInput {
    categoria: String!
    ubicacion: String!
    nombre: String!
}`;

export const tiendasQueries = `
    getTiendas: [Tienda]!
    tiendaById(id: Int!): Tienda!
`;

export const tiendasMutations = `
    createTienda(tienda: TiendaInput!): Tienda2!
    deleteTienda(id: Int!): Int
    updateTienda(id: Int!, Tienda: TiendaInput!): Tienda!
`;