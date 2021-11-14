const db    = require('../libraries/db')
const transactionLogService = require('../services/transaction-log')

const getAllTransactions = async () => {
    try{
        let data = await transactionLogService.getAll()
        return data
    } catch (err){
        throw(err)
    }
}

module.exports = {
    getAllTransactions,
}