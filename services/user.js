const db = require('../libraries/db')
const table = 'auth.users'
const primaryKey = 'user_id'

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

const insert = async (userId, userNm, email, password, roleId) => {
    try {
        let data = await db.one(`INSERT INTO ${table}(user_id,user_nm,email,password,role_id) VALUES($1, $2, $3, $4, $5) RETURNING ${primaryKey}`, [userId, userNm, email, password, roleId])
        return `${data.user_id} has been inserted`
    } catch (err) {
        throw(err)
    }
}

const update = async (userId, userNm, email, password, roleId) => {
    try {
        await db.any(`UPDATE ${table} SET user_nm = $2, email = $3, password = $4, role_id = $5 WHERE ${primaryKey} = $1`, [userId, userNm, email, password, roleId])
        return `${userId} has been updated`
    } catch (err) {
        throw(err)
    }
}

const remove = async (userId) => {
    try {
        await db.any(`DELETE FROM ${table} WHERE ${primaryKey} = $1`, [userId])
        return `${userId} has been removed`
    } catch (err) {
        throw(err)
    }
}

module.exports = {
    getAll,
    getById,
    insert,
    update,
    remove,
}