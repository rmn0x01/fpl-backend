const playerService = require('../services/player')
const path = require('path')

const getAll = async (req, res) => {
    try{
        let result = await playerService.getAll()
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
        let result = await playerService.getById(req.params.id)
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

const insert = async (req, res) => {
    try {
        const playerId = req.body.player_id
        const playerNm = req.body.player_nm
        const playerImg = req.body.player_id + path.extname(req.file.originalname)
        let result = await playerService.insert(playerId, playerNm, playerImg)
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
        const playerId = req.params.id
        //validate
        let validate = await playerService.getById(playerId)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        const playerImg = validate[0].player_img
        const playerNm  = req.body.player_nm || validate[0].player_nm
        let result = await playerService.update(playerId, playerNm, playerImg)
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

const updatePhoto = async (req, res) => {
    try {
        const playerId = req.params.id
        const playerImg = playerId + path.extname(req.file.originalname)
        //validate
        let validate = await playerService.getById(playerId)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        const playerNm = validate[0].player_nm
        let result = await playerService.updatePhoto(playerId, playerNm, playerImg)
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

const remove = async (req, res) => {
    try{
        //validate
        let validate = await playerService.getById(req.params.id)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        let result = await playerService.remove(req.params.id)
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
    insert,
    update,
    updatePhoto,
    remove
}