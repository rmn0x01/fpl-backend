const db    = require('../libraries/db')
const table = 'auth.roles'
const primaryKey = 'role_id'

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

const insert = async (roleId, roleNm) => {
    try {
        let data = await db.one(`INSERT INTO ${table}(role_id,role_nm) VALUES($1, $2) RETURNING ${primaryKey}`, [roleId, roleNm])
        return `${data.role_id} has been inserted`
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