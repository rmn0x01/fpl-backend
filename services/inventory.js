const db    = require('../libraries/db')
const table = 'marketplace.user_inventories'
const primaryKey = 'user_inventory_id'

const getAll = async () => {
    try{
        let data = await db.any(`SELECT * FROM ${table}`, [true])
        return data
    } catch (err){
        throw(err)
    }
}

const getById = async (id) => {
    try{
        let data = await db.any(`SELECT * FROM ${table} WHERE ${primaryKey} = $1`, [id])
        return data
    } catch (err){
        throw(err)
    }

}

const getByUser = async (userId) => {
    try {
        let data = await db.any(`SELECT * FROM ${table} WHERE user_id = $1::varchar`, [userId])
        return data
    } catch (err) {
        throw(err)
    }
}

const getByUserAndSquad = async (userId, squadId) => {
    try{
        let data = await db.any(`SELECT * FROM ${table} WHERE user_id = $1::varchar AND squad_id = $2::integer LIMIT 1`, [userId,squadId])
        return data
    } catch (err){
        throw(err)
    }

}

const insert = async (userId, squadId) => {
    try {
        let data = await db.any(`INSERT INTO ${table}(user_id, squad_id) VALUES($1,$2) RETURNING ${primaryKey}`,[userId, squadId])
        return `${data.user_inventory_id} has been inserted`
    } catch (err) {
        throw(err)
    }
}

const remove = async (userInventoryId) => {
    try {
        await db.any(`DELETE FROM ${table} WHERE ${primaryKey} = $1`, [userInventoryId])
        return `${userInventoryId} has been removed`
    } catch (err) {
        throw(err)
    }
}

const countActivePlayerByUser = async (userId) => {
    try {
        let data = await db.any(`
            SELECT COUNT(*) FROM ${table}
            WHERE user_id = $1::varchar 
            AND is_active = true;
        `,[userId])
        return data
    } catch (err) {
        throw(err)
    }
}

const toggleActive = async (userId, userInventoryId) => {
    try {
        //validate if exists
        const checkExisting = await getById(userInventoryId)
        if(checkExisting.length==0){
            throw 'Invalid ID'
        }
        //validate if userId really owns userInventoryId
        if(checkExisting[0].user_id != userId){
            throw 'No Permission'
        }
        //validate if active player is less than 11
        let activePlayer = await countActivePlayerByUser(userId)
        const maxActivePlayer = process.env.PLAYER_MAX_ACTIVE_PLAYER || 11
        if(activePlayer[0].count >= maxActivePlayer){
            throw 'Reached Maximum Active Player'
        }
        await db.any(`UPDATE ${table} SET is_active = TRUE WHERE ${primaryKey} = $1`, [userInventoryId])
        return `${userInventoryId} has been updated`
    } catch (err) {
        throw(err)
    }
}

const toggleInactive = async (userId, userInventoryId) => {
    try {
        //validate if exists
        const checkExisting = await getById(userInventoryId)
        if(checkExisting.length==0){
            throw 'Invalid ID'
        }
        //validate if userId really owns userInventoryId
        if(checkExisting[0].user_id != userId){
            throw 'No Permission'
        }
        await db.any(`UPDATE ${table} SET is_active = FALSE WHERE ${primaryKey} = $1`, [userInventoryId])
        return `${userInventoryId} has been updated`
    } catch (err) {
        throw(err)
    }
}

module.exports = {
    getAll,
    getById,
    getByUser,
    getByUserAndSquad,
    insert,
    remove,
    countActivePlayerByUser,
    toggleActive,
    toggleInactive,
}