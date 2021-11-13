const db    = require('../libraries/db')
const table = 'marketplace.prices'
const view  = 'marketplace.latest_prices'
const primaryKey = 'price_id'

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

const getByTeam = async (id) => {
    try{
        let data = await db.any(`SELECT * FROM ${view} WHERE team_id = $1::varchar`, [id])
        return data
    } catch (err){
        throw(err)
    }
}

const getByPlayer = async (id) => {
    try{
        let data = await db.any(`SELECT * FROM ${view} WHERE player_id = $1::varchar`, [id])
        return data
    } catch (err){
        throw(err)
    }
}

const getBySeason = async (id) => {
    try{
        let data = await db.any(`SELECT * FROM ${view} WHERE season = $1::varchar`, [id])
        return data
    } catch (err){
        throw(err)
    }
}

const insert = async (squadId, price) => {
    try {
        let data = await db.one(`INSERT INTO ${table}(squad_id,price,created_at) VALUES($1, $2, CURRENT_TIMESTAMP) RETURNING ${primaryKey}`, [squadId, price])
        return `${data.price_id} has been inserted`
    } catch (err) {
        throw(err)
    }
}

const update = async (priceId, price) => {
    try {
        await db.any(`UPDATE ${table} SET price = $1 WHERE ${primaryKey} = $2`, [price, priceId])
        return `${priceId} has been updated`
    } catch (err) {
        throw(err)
    }
}

const remove = async (priceId) => {
    try {
        await db.any(`DELETE FROM ${table} WHERE ${primaryKey} = $1`, [priceId])
        return `${priceId} has been removed`
    } catch (err) {
        throw(err)
    }
}

module.exports = {
    getAll,
    getById,
    getByTeam,
    getByPlayer,
    getBySeason,
    insert,
    update,
    remove
}