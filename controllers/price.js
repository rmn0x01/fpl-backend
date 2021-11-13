const priceService = require('../services/price')

const getAll = async (req, res) => {
    try{
        let result = await priceService.getAll()
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
        let result = await priceService.getById(req.params.id)
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

const getByTeam = async (req, res) => {
    try{
        let result = await priceService.getByTeam(req.params.team_id)
        if(result.length === 0){
            throw 'Invalid ID'
        }
        res.status(200).json({
            team: req.params.team_id,
            data: result
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

const getByPlayer = async (req, res) => {
    try{
        let result = await priceService.getByPlayer(req.params.player_id)
        if(result.length === 0){
            throw 'Invalid ID'
        }
        res.status(200).json({
            player_id: req.params.player_id,
            data: result
        })
    } catch(err){
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

const getBySeason = async (req, res) => {
    try{
        let result = await priceService.getBySeason(req.params.season)
        if(result.length === 0){
            throw 'Invalid ID'
        }
        res.status(200).json({
            season: req.params.season,
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
        const squadId = req.body.squad_id
        const price = req.body.price
        let result = await priceService.insert(squadId, price)
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
/**
 * Use Insert price instead for the prices to be recorded over time.
 * Only use this to correct things (e.g: wrong setting price in particular timestamp)
 * + no modify squad_id, only the price
 * @param {*} req 
 * @param {*} res 
 */
const update = async (req, res) => {
    try{
        const priceId = req.params.id
        const price = req.body.price
        //validate
        let validate = await priceService.getById(priceId)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        let result = await priceService.update(priceId, price)
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
        let validate = await priceService.getById(req.params.id)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        let result = await priceService.remove(req.params.id)
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
    getByTeam,
    getByPlayer,
    getBySeason,
    insert,
    update,
    remove
}