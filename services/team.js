const db    = require('../libraries/db')
const table = 'fpl.teams'
const primaryKey = 'team_id'

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

const insert = async (teamId, teamNm, teamImg, isOnPl) => {
    try {
        let data = await db.one(`INSERT INTO ${table}(team_id,team_nm,team_img,is_on_pl) VALUES($1, $2, $3, $4) RETURNING ${primaryKey}`, [teamId, teamNm, teamImg, isOnPl])
        return `${data.team_id} has been inserted`
    } catch (err) {
        throw(err)
    }
}

const update = async (roleId, roleNm) => {
    try {
        await db.any(`UPDATE ${table} SET role_nm = $1 WHERE ${primaryKey} = $2`, [roleNm, roleId])
        return `${roleId} has been updated`
    } catch (err) {
        throw(err)
    }
}

const remove = async (roleId) => {
    try {
        await db.any(`DELETE FROM ${table} WHERE ${primaryKey} = $1`, [roleId])
        return `${roleId} has been removed`
    } catch (err) {
        throw(err)
    }
}

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove
}