const creditService = require('../services/credit')

const getAll = async (req, res) => {
    try{
        let result = await creditService.getAll()
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

const insert = async (req, res) => {
    try {
        const userId = req.body.user_id
        const credit = process.env.PLAYER_STARTING_CREDIT || 300
        let checkExisting = await creditService.getByUser(userId)
        if(checkExisting.length>0){
            throw 'Already existed'
        }
        let result = await creditService.insert(userId, credit)
        res.status(200).json({
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
    getAll,
    insert,
}