const marketService = require('../services/market')

const getAllTransactions = async (req, res) => {
    try{
        let result = await marketService.getAllTransactions()
        res.status(200).json({
            data: result
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

module.exports = {
    getAllTransactions
}