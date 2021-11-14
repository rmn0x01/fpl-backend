const db    = require('../libraries/db')
const table = 'marketplace.transaction_logs'
const view  = 'marketplace.vw_transaction_logs'
const primaryKey = 'transaction_log_id'

const getAll = async () => {
    try{
        let data = await db.any(`SELECT * FROM ${view}`, [true])
        return data
    } catch (err){
        throw(err)
    }
}

const insert = async (userId, priceId, activity) => {
    try {
        let data = await db.any(`INSERT INTO ${table}(user_id, price_id, activity) VALUES($1,$2,$3) RETURNING ${primaryKey}`,[userId, priceId, activity])
        return `${data.transaction_log_id} has been inserted`
    } catch (err) {
        throw(err)
    }
}

module.exports = {
    getAll,
    insert
}