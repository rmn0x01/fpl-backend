const db    = require('../libraries/db')
const fs    = require('fs')
const path  = require('path')
const playerPhotosDirectory = process.env.PLAYER_PHOTOS_DIRECTORY || 'public/data/players'
const table = 'fpl.players'
const primaryKey = 'player_id'

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

const insert = async (playerId, playerNm, playerPos, playerImg) => {
    try {
        let data = await db.one(`INSERT INTO ${table}(player_id,player_nm,player_pos,player_img) VALUES($1, $2, $3, $4) RETURNING ${primaryKey}`, [playerId, playerNm, playerPos, playerImg])
        return `${data.player_id} has been inserted`
    } catch (err) {
        throw(err)
    }
}

const update = async (playerId, playerNm, playerPos, playerImg, isOnPl) => {
    try {
        await db.any(`UPDATE ${table} SET player_nm = $2, player_pos = $3, player_img = $4 WHERE ${primaryKey} = $1`, [playerId, playerNm, playerPos, playerImg])
        return `${playerId} has been updated`
    } catch (err) {
        throw(err)
    }
}

const updatePhoto = async (playerId, playerNm, playerPos, playerImg, isOnPl) => {
    try {
        //remove file
        const data = await getById(playerId)
        const photoPath = path.join(__dirname, '../' + playerPhotosDirectory + '/' + data[0].player_img)
        await fs.unlink(photoPath, (err) => {
            if(err && err.code == 'ENOENT'){ //continue if file doesnt exist
            } else if (err){
                throw(err) //throw error on any error but file doesnt exist
            }
        })
        await db.any(`UPDATE ${table} SET player_nm = $2, player_pos = $3, player_img = $4 WHERE ${primaryKey} = $1`, [playerId, playerNm, playerPos, playerImg])
        return `${playerId} has been updated`
    } catch (err) {
        throw(err)
    }
}

const remove = async (playerId) => {
    try {
        //remove file
        const data = await getById(playerId)
        const photoPath = path.join(__dirname, '../' + playerPhotosDirectory + '/' + data[0].player_img)
        await fs.unlink(photoPath, (err) => {
            if(err && err.code == 'ENOENT'){ //continue if file doesnt exist
            } else if (err){
                throw(err) //throw error on any error but file doesnt exist
            }
        })

        await db.any(`DELETE FROM ${table} WHERE ${primaryKey} = $1`, [playerId])
        return `${playerId} has been removed`
    } catch (err) {
        throw(err)
    }
}

module.exports = {
    getAll,
    getById,
    insert,
    update,
    updatePhoto,
    remove
}