const db    = require('../libraries/db')

const getAllTransactions = async () => {
    try{
        let data = await db.any(`SELECT * FROM marketplace.transaction_logs`, [true])
        return data
    } catch (err){
        throw(err)
    }
}

module.exports = {
    getAllTransactions,
}