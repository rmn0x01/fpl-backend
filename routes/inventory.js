const express = require('express')
const router = express.Router()
const inventoryController = require('../controllers/inventory')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

router.get('/',authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, inventoryController.getAll)
router.get('/my-inventory', authMiddleware.verifyToken, inventoryController.getByUser)
router.get('/toggle-active/:id', authMiddleware.verifyToken, inventoryController.toggleActive)
router.get('/toggle-inactive/:id', authMiddleware.verifyToken, inventoryController.toggleInactive)
module.exports = router