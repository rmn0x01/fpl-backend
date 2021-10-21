const express = require('express')
const router = express.Router()
const roleController = require('../controllers/role')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

router.get('/all', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, roleController.getAll)
router.get('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, roleController.getById)
router.post('/', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, roleController.insert)
router.put('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, roleController.update)
router.delete('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, roleController.remove)

module.exports = router