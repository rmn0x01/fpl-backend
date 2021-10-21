const db = require('../libraries/db')

const getById = async (id) => {
    try{
        let data = await db.any('SELECT * FROM auth.users WHERE user_id = $1', [id])
        return data
    } catch (err){
        throw(err)
    }

}

const insert = async (userId, userNm, password, role) => {
    try {
        let data = await db.one('INSERT INTO auth.users(user_id,user_nm,password,role) VALUES($1, $2, $3, $4) RETURNING user_id', [userId, userNm, password, role])
        return `${data.user_id} has been inserted`
    } catch (err) {
        throw(err)
    }
}

module.exports = {
    getById,
    insert
}