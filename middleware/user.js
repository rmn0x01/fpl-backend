const userService = require('../services/user')

const duplicateCheck = async (req, res, next) => {
    const userId = req.body.user_id
    if(!userId){
        return res.status(403).json({
            message: 'User ID is required'
        })
    }

    let validate = await userService.getById(userId)
    if(validate.length > 0){
        return res.status(400).json({
            message: 'User ID is already in use'
        })
    }
    return next()
}

module.exports = {
    duplicateCheck
}