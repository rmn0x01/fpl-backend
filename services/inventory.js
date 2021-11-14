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

module.exports = {
    getAll,
    getById,
    getByUserAndSquad,
    insert,
    remove
}