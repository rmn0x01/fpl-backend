const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const userMiddleware = require('../middleware/user')

router.post('/register', userMiddleware.duplicateCheck, userController.register)
router.post('/login',userController.login)

module.exports = router