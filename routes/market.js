const express = require('express')
const router = express.Router()
const marketController = require('../controllers/market')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

router.get('/transactions', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, marketController.getAllTransactions)
router.get('/buy/:id', authMiddleware.verifyToken, marketController.buy)
router.get('/sell/:id', authMiddleware.verifyToken, marketController.sell)

module.exports = router