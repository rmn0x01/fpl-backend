const express = require('express')
const router = express.Router()
const matchController = require('../controllers/match')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

router.get('/', authMiddleware.verifyToken, matchController.getAll)
router.get('/sync', authMiddleware.verifyToken, matchController.sync)

module.exports = router