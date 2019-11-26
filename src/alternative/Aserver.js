/*export const url = '192.168.1.52'
export const port = 3002
export const entryPoint = 'alternatives'*/
export const url = process.env.ALTERNATIVES_URL
export const port = process.env.ALTERNATIVES_PORT
export const entryPoint = process.env.ALTERNATIVES_ENTRY