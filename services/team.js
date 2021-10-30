const db    = require('../libraries/db')
const fs    = require('fs')
const path  = require('path')
const teamPhotosDirectory = process.env.TEAM_PHOTOS_DIRECTORY || 'public/data/teams'
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

const update = async (teamId, teamNm, teamImg, isOnPl) => {
    try {
        await db.any(`UPDATE ${table} SET team_nm = $2, team_img = $3, is_on_pl = $4 WHERE ${primaryKey} = $1`, [teamId, teamNm, teamImg, isOnPl])
        return `${teamId} has been updated`
    } catch (err) {
        throw(err)
    }
}

const remove = async (teamId) => {
    try {
        //remove file
        const data = await getById(teamId)
        const photoPath = path.join(__dirname, '../' + teamPhotosDirectory + '/' + data[0].team_img)
        await fs.unlink(photoPath, (err) => {
            if(err && err.code == 'ENOENT'){ //continue if file doesnt exist
            } else if (err){
                throw(err) //throw error on any error but file doesnt exist
            }
        })

        await db.any(`DELETE FROM ${table} WHERE ${primaryKey} = $1`, [teamId])
        return `${teamId} has been removed`
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