const db    = require('../libraries/db')
const table = 'marketplace.transaction_logs'
const primaryKey = 'transaction_log_id'

const getAll = async () => {
    try{
        let data = await db.any(`SELECT * FROM ${table}`, [true])
        return data
    } catch (err){
        throw(err)
    }
}

module.exports = {
    getAll
}