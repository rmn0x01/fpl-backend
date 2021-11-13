const express = require('express')
const router = express.Router()
const priceController = require('../controllers/price')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

router.get('/', authMiddleware.verifyToken, priceController.getAll)
router.get('/team/:team_id', authMiddleware.verifyToken, priceController.getByTeam)
router.get('/player/:player_id', authMiddleware.verifyToken, priceController.getByPlayer)
router.get('/season/:season', authMiddleware.verifyToken, priceController.getBySeason)
router.get('/:id', authMiddleware.verifyToken, priceController.getById)
router.post('/', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, priceController.insert)
router.put('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, priceController.update)
router.delete('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, priceController.remove)

module.exports = router