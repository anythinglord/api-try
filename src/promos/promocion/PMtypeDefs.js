export const promocionesTypeDef = `
type Promocion {
    id_promocion: Int!
    id_tienda: Int!
    descripcion: String!
    fecha_inicio: String!
    fecha_fin: String!
}
type Promocion2 {
    id_tienda: Int!
    descripcion: String!
    fecha_inicio: String!
    fecha_fin: String!
}
input PromocionInput {
    id_tienda: Int!
    descripcion: String!
    fecha_inicio: String!
    fecha_fin: String!
}`;

export const promocionesQueries = `
    getPromociones: [Promocion]!
    promocionById(id: Int!): Promocion!
`;

export const promocionesMutations = `
    createPromocion(promocion: PromocionInput!): Promocion!
    deletePromocion(id: Int!): Int
    updatePromocion(id: Int!, Promocion: PromocionInput!): Promocion!
`;