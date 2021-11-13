const express = require('express')
const router = express.Router()
const matchController = require('../controllers/match')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

router.get('/', authMiddleware.verifyToken, matchController.getAll)
router.get('/sync', authMiddleware.verifyToken, matchController.sync)
router.get('/calculate/:gameweek', authMiddleware.verifyToken, matchController.calculate)
router.get('/gameweek/:season/:gameweek', authMiddleware.verifyToken, matchController.getBySeasonAndGameweek)
router.get('/:id', authMiddleware.verifyToken, matchController.getById)



module.exports = router