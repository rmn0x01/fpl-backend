const express = require('express')
const router = express.Router()
const matchController = require('../controllers/match')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

router.get('/', authMiddleware.verifyToken, matchController.getAll)
router.get('/sync', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, matchController.sync)
router.get('/calculate/:season/:gameweek', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, matchController.calculate)
router.get('/gameweek/:season/:gameweek', authMiddleware.verifyToken, matchController.getBySeasonAndGameweek)
router.get('/user-scoring/:season/:gameweek', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, matchController.userScoring)
router.get('/:id', authMiddleware.verifyToken, matchController.getById)



module.exports = router