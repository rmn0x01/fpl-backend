const db    = require('../libraries/db')
const table = 'marketplace.user_credits'
const primaryKey = 'user_credit_id'

const getAll = async () => {
    try{
        let data = await db.any(`SELECT * FROM ${table}`, [true])
        return data
    } catch (err){
        throw(err)
    }
}

const getByUser = async (userId) => {
    try {
        let data = await db.any(`SELECT * FROM ${table} WHERE user_id = $1::varchar LIMIT 1`,[userId])
        return data
    } catch (err) {
        throw(err)
    }
}

const insert = async (userId, credit) => {
    try {
        let data = await db.any(`INSERT INTO ${table}(user_id, credit) VALUES($1,$2) RETURNING ${primaryKey}`,[userId, credit])
        return data
    } catch (err) {
        throw(err)
    }
}

const update = async (userId, credit) => {
    try {
        await db.any(`UPDATE ${table} SET credit = $1 WHERE user_id = $2::varchar`, [credit, userId])
        return `${userId} has been updated`
    } catch (err) {
        throw(err)
    }
}

const subtractCredit = async (userId, amount) => {
    try {
        let userCredit = await getByUser(userId)
        let creditAfterSubtracted = parseFloat(userCredit[0].credit) - parseFloat(amount)
        await update(userId, creditAfterSubtracted)
        return `${userId} has been subtracted`

    } catch (err) {
        throw(err)
    }
}

const addCredit = async (userId, amount) => {
    try {
        let userCredit = await getByUser(userId)
        let creditAfterAdded = parseFloat(userCredit[0].credit) + parseFloat(amount)
        await update(userId, creditAfterAdded)
        return `${userId} has been added`

    } catch (err) {
        throw(err)
    }
}

module.exports = {
    getAll,
    getByUser,
    insert,
    update,
    subtractCredit,
    addCredit
}