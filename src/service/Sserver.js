/*export const url = '192.168.1.52'
export const port = 3003
export const entryPoint = 'services'
*/

export const url = process.env.SERVICES_URL
export const port = process.env.SERVICES_PORT
export const entryPoint = process.env.SERVICES_ENTRY