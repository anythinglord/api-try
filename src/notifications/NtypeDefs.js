export const notificationsTypeDef = `
type Notification {
    id_persona: Int!
    tipo: String!
    medio: String!
    titulo: String!
    descripcion: String!
}
input NotificationInput {
    id_persona: Int!
    tipo: String!
    medio: String!
    titulo: String!
    descripcion: String!
}`;

export const notificationsQueries = `
    getNotifications: [Notification]!
    notificationById(id: Int!): Notification!
`;

export const notificationsMutations = `
    createNotification(Notification: NotificationInput!): Notification!
    deleteNotification(id: Int!): Int
    updateNotification(id: Int!, Notification: NotificationInput!): Notification!
`;