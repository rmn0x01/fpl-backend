const inventoryService = require('../services/inventory')

const getAll = async (req, res) => {
    try {
        let result = await inventoryService.getAll()
        res.status(200).json({
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

const getByUser = async (req, res) => {
    try {
        const userId = req.user.user_id
        let result = await inventoryService.getByUser(userId)
        res.status(200).json({
            user_id : userId,
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

const toggleActive = async (req, res) => {
    try {
        const userId = req.user.user_id
        const userInventoryId = req.params.id
        let result = await inventoryService.toggleActive(userId, userInventoryId)
        res.status(200).json({
            user_inventory_id: userInventoryId,
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

const toggleInactive = async (req, res) => {
    try {
        const userId = req.user.user_id
        const userInventoryId = req.params.id
        let result = await inventoryService.toggleInactive(userId, userInventoryId)
        res.status(200).json({
            user_inventory_id: userInventoryId,
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

module.exports = {
    getAll,
    getByUser,
    toggleActive,
    toggleInactive,
}