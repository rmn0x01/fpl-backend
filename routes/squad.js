const express = require('express')
const router = express.Router()
const squadController = require('../controllers/squad')
const authMiddleware = require('../middleware/auth')
const roleMiddleware = require('../middleware/role')

router.get('/', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, squadController.getAll)
router.get('/hehe', (req,res) => {
    const haha = req.query.haha
    res.status(200).json({
        data: haha
    })
})
router.get('/custom', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, squadController.getBySeasonOrTeam)
router.get('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, squadController.getById)
router.post('/', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, squadController.insert)
router.put('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, squadController.update)
router.delete('/:id', authMiddleware.verifyToken, roleMiddleware.isAdminOrSuper, squadController.remove)

module.exports = router