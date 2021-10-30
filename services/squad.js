const db    = require('../libraries/db')
const table = 'fpl.squads'
const primaryKey = 'squad_id'

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

const getBySeasonOrTeam = async(season,teamId) => {
    try{
        let query = `SELECT * FROM ${table}`;
        let queryParam = []
        if(season){
            queryParam.push(season)
            query += ` WHERE season = $1`
        } else if(teamId){
            queryParam.push(teamId)
            query += ' WHERE team_id = $1'
        }
        if(teamId){
            queryParam.push(teamId)
            query += ' AND team_id = $2'
        }
        console.log(query)
        let data = await db.any(query, queryParam)
        return data
    } catch (err){
        throw(err)
    }
}

const insert = async (season, teamId, playerId) => {
    try {
        let data = await db.one(`INSERT INTO ${table}(season,team_id,player_id) VALUES($1, $2, $3) RETURNING ${primaryKey}`, [season, teamId, playerId])
        return `${data.squad_id} has been inserted`
    } catch (err) {
        throw(err)
    }
}

const update = async (squadId, season, teamId, playerId) => {
    try {
        await db.any(`UPDATE ${table} SET season = $2, team_id = $3, player_id = $4 WHERE ${primaryKey} = $1`, [squadId, season, teamId, playerId])
        return `${squadId} has been updated`
    } catch (err) {
        throw(err)
    }
}

const remove = async (squadId) => {
    try {
        await db.any(`DELETE FROM ${table} WHERE ${primaryKey} = $1`, [squadId])
        return `${squadId} has been removed`
    } catch (err) {
        throw(err)
    }
}

module.exports = {
    getAll,
    getById,
    getBySeasonOrTeam,
    insert,
    update,
    remove
}