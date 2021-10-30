const teamService = require('../services/team')
const path = require('path')

const getAll = async (req, res) => {
    try{
        let result = await teamService.getAll()
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
        let result = await teamService.getById(req.params.id)
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
        const teamId = req.body.team_id
        const teamNm = req.body.team_nm
        const teamImg = req.body.team_id + path.extname(req.file.originalname)
        const isOnPl = req.body.is_on_pl
        let result = await teamService.insert(teamId, teamNm, teamImg, isOnPl)
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
        const teamId = req.params.id
        //validate
        let validate = await teamService.getById(teamId)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        const teamImg = validate[0].team_img
        const teamNm  = req.body.team_nm || validate[0].team_nm
        const isOnPl  = req.body.is_on_pl || validate[0].is_on_pl
        let result = await teamService.update(teamId, teamNm, teamImg, isOnPl)
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
        const teamId = req.params.id
        const teamImg = teamId + path.extname(req.file.originalname)
        //validate
        let validate = await teamService.getById(teamId)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        const teamNm = validate[0].team_nm
        const isOnPl = validate[0].is_on_pl
        let result = await teamService.update(teamId, teamNm, teamImg, isOnPl)
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
        let validate = await teamService.getById(req.params.id)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        let result = await teamService.remove(req.params.id)
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