const express = require('express')
const router = express.Router()
const creditController = require('../controllers/credit')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

router.get('/', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, creditController.getAll)
router.post('/', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, creditController.insert)

module.exports = router