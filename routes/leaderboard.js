const express = require('express')
const router = express.Router()
const leaderboardController = require('../controllers/leaderboard')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

router.get('/overview/:season/:gameweek', authMiddleware.verifyToken, leaderboardController.getOverviewByGameweek)
router.get('/detail/:season/:gameweek/:user_id', authMiddleware.verifyToken, leaderboardController.getDetailById)
module.exports = router