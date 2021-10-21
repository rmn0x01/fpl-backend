const express = require('express')
const router = express.Router()
const roleController = require('../controllers/role')
const authMiddleware = require('../middleware/auth')

router.get('/all', authMiddleware.verifyToken, roleController.getAll)
router.get('/:id', authMiddleware.verifyToken, roleController.getById)
router.post('/', authMiddleware.verifyToken, roleController.insert)
router.put('/:id', authMiddleware.verifyToken, roleController.update)
router.delete('/:id', authMiddleware.verifyToken, roleController.remove)

module.exports = router