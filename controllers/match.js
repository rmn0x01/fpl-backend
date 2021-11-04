const matchService = require('../services/match')

const getAll = async (req, res) => {
    try{
        let result = await matchService.getAll()
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

const sync = async (req, res) => {
    try{
        let result = await matchService.sync()
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
    getAll,
    sync
}