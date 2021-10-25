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

// const update = async (req, res) => {
//     try{
//         const roleId = req.params.id
//         const roleNm = req.body.role_nm
//         //validate
//         let validate = await teamService.getById(roleId)
//         if(validate.length === 0){
//             throw 'Invalid ID'
//         }
//         let result = await teamService.update(roleId, roleNm)
//         res.status(200).json({
//             data: result
//         })
//     } catch (err){
//         console.log(err)
//         res.status(400).json({
//             message: err.message || err
//         })
//     }
// }

// const remove = async (req, res) => {
//     try{
//         //validate
//         let validate = await teamService.getById(req.params.id)
//         if(validate.length === 0){
//             throw 'Invalid ID'
//         }
//         let result = await teamService.remove(req.params.id)
//         res.status(200).json({
//             data: result
//         })
//     } catch(err){
//         console.log(err)
//         res.status(400).json({
//             message: err.message || err
//         })
//     }
// }

module.exports = {
    getAll,
    getById,
    insert,
    // update,
    // remove
}