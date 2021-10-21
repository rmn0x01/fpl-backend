const userService = require('../services/user')

async function getRoleByUserId(userId){
    const user = await userService.getById(userId)
    return user[0].role_id
}

const isAdminOrSuper = async (req, res, next) => {
    const role = await getRoleByUserId(req.user.user_id)
    if(!role){
        return res.status(403).json({
            message: 'Invalid User'
        })
    }
    try {
        if(![process.env.SUPER_ROLE, process.env.ADMIN_ROLE].includes(role)){
            return res.status(403).json({
                message: 'Unauthorized',
                role: role
            })
        }
    } catch (err) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
    return next()
}

const isSuper = async (req, res, next) => {
    const role = await getRoleByUserId(req.user.user_id)
    if(!role){
        return res.status(403).json({
            message: 'Invalid User'
        })
    }
    try {
        if(role != process.env.SUPER_ROLE){
            return res.status(403).json({
                message: 'Unauthorized'
            })
        }
    } catch (err) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
    return next()
}

module.exports = {
    isAdminOrSuper,
    isSuper
}