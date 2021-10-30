const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const userMiddleware = require('../middleware/user')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

router.post('/register', userMiddleware.duplicateCheck, userController.register)
router.post('/login',userController.login)
router.get('/', authMiddleware.verifyToken, roleMiddleware.isSuper, userController.getAll)
router.get('/:id', authMiddleware.verifyToken, roleMiddleware.isSuper, userController.getById)
router.post('/', authMiddleware.verifyToken, roleMiddleware.isSuper, userController.insert)
router.put('/:id', authMiddleware.verifyToken, roleMiddleware.isSuper, userController.update)
router.delete('/:id', authMiddleware.verifyToken, roleMiddleware.isSuper, userController.remove)

module.exports = router