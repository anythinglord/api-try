export const url = process.env.LDAP_URL
export const port = process.env.LDAP_PORT

// autenticar usuarios
//export const entryPointA = 'auth'
export const entryPointA = process.env.LDAP_ENTRYA


// autenticar administradores
export const entryPointAa = process.env.LDAP_ENTRYAa

// agregar usuarios
export const entryPointAd = process.env.LDAP_ENTRYAd
//export const entryPointAd = 'add'


// agregar administradores
export const entryPointAda = process.env.LDAP_ENTRYAda
// verificar Token
export const entryPointV = process.env.LDAP_ENTRYV
