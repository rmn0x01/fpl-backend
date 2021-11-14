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

const buy = async (req, res) => {
    try {
        const squadId   = req.params.id
        const userId    = req.user.user_id
        let result = await marketService.buy(userId,squadId)
        res.status(200).json({
            id: req.params.id,
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

const sell = async (req, res) => {
    try {
        const userInventoryId   = req.params.id
        const userId    = req.user.user_id
        let result = await marketService.sell(userId,userInventoryId)
        res.status(200).json({
            id: req.params.id,
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

module.exports = {
    getAllTransactions,
    buy,
    sell
}