const squadService = require('../services/squad')

const getAll = async (req, res) => {
    try{
        let result = await squadService.getAll()
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

const getById = async (req, res) => {
    try{
        let result = await squadService.getById(req.params.id)
        if(result.length === 0){
            throw 'Invalid ID'
        }
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

const getBySeasonOrTeam = async (req, res) => {
    try{
        const season = req.query.season
        const teamId = req.query.team_id
        let result = await squadService.getBySeasonOrTeam(season, teamId)
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
        const season = req.body.season
        const teamId = req.body.team_id
        const playerId = req.body.player_id
        let result = await squadService.insert(season, teamId, playerId)
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

const update = async (req, res) => {
    try{
        const squadId = req.params.id
        const season = req.body.season
        const teamId = req.body.team_id
        const playerId = req.body.player_id
        //validate
        let validate = await squadService.getById(squadId)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        let result = await squadService.update(squadId, season, teamId, playerId)
        res.status(200).json({
            data: result
        })
    } catch (err){
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

const remove = async (req, res) => {
    try{
        //validate
        let validate = await squadService.getById(req.params.id)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        let result = await squadService.remove(req.params.id)
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
    getById,
    getBySeasonOrTeam,
    insert,
    update,
    remove
}