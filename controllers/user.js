const userService = require('../services/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const getAll = async (req, res) => {
    try{
        let result = await userService.getAll()
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
        let result = await userService.getById(req.params.id)
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

const register = async  (req, res) => {
    try {
        const userId = req.body.user_id
        const userNm = req.body.user_nm
        const email  = req.body.email
        const password = req.body.password
        const roleId = req.body.role_id
        //Hash Password
        const encryptedPassword = await bcrypt.hash(password, 10)
        let result = await userService.insert(userId, userNm, email, encryptedPassword, roleId)
        
        const token = jwt.sign({
            user_id : userId,
            user_nm : userNm,
            email   : email,
            role_id : roleId
        }, process.env.JWT_SECRET,{
            expiresIn :"1h"
        })

        result = {
            user_id : userId,
            user_nm : userNm,
            email   : email,
            role_id : roleId,
            token   : token
        }

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

const login = async (req, res) => {
    try {
        const userId = req.body.user_id
        const password = req.body.password
        const user = await userService.getById(userId)
        if((user.length > 0) && (await bcrypt.compare(password, user[0].password))){
            const token = jwt.sign({
                user_id : user[0].user_id,
                user_nm : user[0].user_nm,
                email   : user[0].email,
                role_id : user[0].role_id
            }, process.env.JWT_SECRET,{
                expiresIn :"1h"
            })
    
            result = {
                user_id : user[0].user_id,
                user_nm : user[0].user_nm,
                email   : user[0].email,
                role_id : user[0].role_id,
                token   : token
            }
    
            res.status(200).json({
                data: result
            })
        } else {
            throw "Invalid User ID or Password"
        }
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

const insert = async (req, res) => {
    try {
        const userId = req.body.user_id
        const userNm = req.body.user_nm
        const email  = req.body.email
        const password = req.body.password
        const roleId = req.body.role_id

        //Hash Password
        const encryptedPassword = await bcrypt.hash(password, 10)
        let result = await userService.insert(userId, userNm, email, encryptedPassword, roleId)

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
        const userId = req.params.id
        const userNm = req.body.user_nm
        const email  = req.body.email
        const password = req.body.password
        const roleId = req.body.role_id
        //validate
        let validate = await userService.getById(userId)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        //Hash Password
        const encryptedPassword = await bcrypt.hash(password, 10)
        let result = await userService.update(userId, userNm, email, encryptedPassword, roleId)
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
        let validate = await userService.getById(req.params.id)
        if(validate.length === 0){
            throw 'Invalid ID'
        }
        let result = await userService.remove(req.params.id)
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
    register,
    login,
    insert,
    update,
    remove,
}