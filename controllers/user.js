const userService = require('../services/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = async  (req, res) => {
    try {
        const userId = req.body.user_id
        const userNm = req.body.user_nm
        const password = req.body.password
        const role = req.body.role
        //Hash Password
        const encryptedPassword = await bcrypt.hash(password, 10)
        let result = await userService.insert(userId, userNm, encryptedPassword, role)
        
        const token = jwt.sign({
            user_id : userId,
            user_nm : userNm,
            role    : role
        }, process.env.JWT_SECRET,{
            expiresIn :"1h"
        })

        result = {
            user_id : userId,
            user_nm : userNm,
            role    : role,
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
                role    : user[0].role
            }, process.env.JWT_SECRET,{
                expiresIn :"1h"
            })
    
            result = {
                user_id : user[0].user_id,
                user_nm : user[0].user_nm,
                role    : user[0].role,
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

module.exports = {
    register,
    login
}