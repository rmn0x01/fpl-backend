const db    = require('../libraries/db')
const table = 'marketplace.user_locked_players'
const view  = 'marketplace.vw_leaderboard'
const primaryKey = 'user_locked_player_id'


const getOverviewByGameweek = async(season, gameweek) => {
    try {
        let data = await db.any(`SELECT * FROM ${view} WHERE season = $1::varchar AND gameweek = $2::integer`,[season, gameweek])
        return data
    } catch (err) {
        throw(err)
    }
}

const getDetailById = async(season, gameweek, userId) => {
    try {
        let data = await db.any(`
            SELECT ulp.*, t.team_nm, p.player_nm, md.total_score FROM marketplace.user_locked_players ulp 
            JOIN fpl.squads s ON ulp.squad_id = s.squad_id 
            JOIN fpl.teams t ON s.team_id = t.team_id 
            JOIN fpl.players p ON s.player_id = p.player_id 
            LEFT JOIN fpl.match_details md ON ulp.match_detail_id = md.match_detail_id 
            WHERE ulp.user_id = $1::varchar AND ulp.season = $2::varchar AND ulp.gameweek = $3::integer
            ORDER BY ulp.user_locked_player_id
        `,[userId, season, gameweek])
        return data
    } catch (err) {
        throw(err)
    }
}

module.exports = {
    getOverviewByGameweek,
    getDetailById
}