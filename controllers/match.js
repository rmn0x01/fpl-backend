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

const getBySeasonAndGameweek = async (req, res) => {
    try {
        let result = await matchService.getBySeasonAndGameweek(req.params.season,req.params.gameweek)
        if(result.length === 0){
            throw 'Invalid Gameweek'
        }
        res.status(200).json({
            season: req.params.season,
            gameweek: req.params.gameweek,
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

const getById = async (req, res) => {
    try {
        let result = await matchService.getById(req.params.id)
        if(result.length === 0){
            throw 'Invalid ID'
        }
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

const calculate = async (req, res) => {
    try {
        let result = await matchService.calculate(req.params.gameweek)
        res.status(200).json({
            gameweek: req.params.gameweek,
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
    getBySeasonAndGameweek,
    getById,
    sync,
    calculate
}