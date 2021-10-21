const roleCheck = (req, res, next) => {
    const role = req.user.role
    if(!role){
        return res.status(403).json({
            status: 0,
            message: 'Invalid User'
        })
    }
    try {
        if(role != 'admin'){
            return res.status(403).json({
                status: 0,
                message: 'Unauthorized'
            })
        }
    } catch (err) {
        return res.status(401).json({
            status: 0,
            message: "invalid token"
        })
    }
    return next()
}

module.exports = {
    roleCheck
}