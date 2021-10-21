const initOptions = {}
const pgp = require('pg-promise')(initOptions)
const dbUser = process.env.DB_USER || 'postgres'
const dbPass = process.env.DB_PASS || 'postgres'
const dbPort = process.env.DB_PORT || '5432'
const dbHost = process.env.DB_HOST || 'localhost'
const dbName = process.env.DB_NAME || 'express_fpl'
const cn =`postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
const db = pgp(cn)

module.exports = db