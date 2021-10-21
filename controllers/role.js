const roleService = require('../services/role')

const getAll = async (req, res) => {
    try{
        let result = await roleService.getAll()
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
        let result = await roleService.getById(req.params.id)
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
        const roleId = req.body.role_id
        const roleNm = req.body.role_nm
        let result = await roleService.insert(roleId, roleNm)
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
        const roleId = req.params.id
        const roleNm = req.body.role_nm
        //validate
        let validate = await roleService.getById(roleId)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        let result = await roleService.update(roleId, roleNm)
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
        let validate = await roleService.getById(req.params.id)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        let result = await roleService.remove(req.params.id)
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
    remove
}