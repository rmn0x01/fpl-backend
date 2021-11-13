const db    = require('../libraries/db')
const table = 'fpl.matches'
const primaryKey = 'match_id'

const https = require('https')

const getAll = async () => {
    try{
        let data = await db.any(`SELECT * FROM ${table}`, [true])
        return data
    } catch (err){
        throw(err)
    }
}
/**
 * Get Match by Season and Gameweek
 * 
 * @param {string} season 
 * @param {integer} gameweek 
 * @returns {object} data
 */
const getBySeasonAndGameweek = async (season,gameweek) => {
    try{
        let data = await db.any(`
            SELECT m.*, t.team_nm AS home_team_name, t2.team_nm AS away_team_nm
            FROM fpl.matches m
            JOIN fpl.teams t ON m.home_team = t.team_id
            JOIN fpl.teams t2 ON m.away_team = t2.team_id
            WHERE m.season = $1::varchar AND m.gameweek = $2::integer
        `,[season, gameweek])
        return data
    } catch (err){
        throw(err)
    }
}
const getById = async (id) => {
    try {
        let data = await db.any(`
            SELECT md.match_detail_id, md.squad_id, t.team_id, t.team_nm, p.player_id, p.player_nm, md.is_starting, md.goal, md.assist, md.yellow_card, md.red_card, md.own_goal
            FROM fpl.match_details md
            JOIN fpl.squads s ON md.squad_id = s.squad_id
            JOIN fpl.teams t ON t.team_id = s.team_id
            JOIN fpl.players p ON p.player_id = s.player_id
            WHERE md.match_id = $1::integer ORDER BY t.team_id
        `, [id])
        return data
    } catch (err) {
        throw(err)
    }
}

const getLatestGameweek = async () => {
    try{
        let data = await db.any(`SELECT MAX(gameweek) FROM ${table}`, [true])
        return (data[0].max === null) ? 0 : data[0].max
    } catch (err){
        throw(err)
    }
}

const sync = async () => {
    try{
        //cek latest gameweek
        let latestGameweek = await getLatestGameweek()
        latestGameweek += 1

        const options = {
            host: 'fantasy.premierleague.com',
            path: '/api/fixtures/?event=' + latestGameweek,
        }
        const req = https.get(options, function(res) {
            console.log('STATUS: ' + res.statusCode )
            console.log('HEADERS: ' + JSON.stringify(res.headers))

            // Buffer the body entirely for processing as a whole.
            var bodyChunks = [];
            res.on('data', function(chunk) {
                // You can process streamed parts here...
                bodyChunks.push(chunk);
            }).on('end', async function() {
                var body = Buffer.concat(bodyChunks);
                console.log('BODY: ' + body);
                // ...and/or process the entire body here.
                console.log('==========')
                jsonBody = JSON.parse(body.toString())
                console.log(jsonBody[0])
                console.log(jsonBody.length)
                
                //check if the gameweek has already finished
                if(jsonBody.length > 0){
                    if(jsonBody[0].finished){
                        //backlog: For Loop need to be done first before returning response, otherwise data.match_id gonna overlap
                        for( let i = 0; i < jsonBody.length; i++){
                            // fpl.matches
                            var season      = process.env.CURRENT_SEASON
                            var gameweek    = latestGameweek
                            var home_team   = jsonBody[i].team_h
                            var away_team   = jsonBody[i].team_a
                            var home_score  = jsonBody[i].team_h_score
                            var away_score  = jsonBody[i].team_a_score
                            let data = await db.one(`INSERT INTO ${table}(season,gameweek,home_team,away_team,home_score,away_score) VALUES($1, $2, $3, $4, $5, $6) RETURNING ${primaryKey}`, [season, gameweek, home_team, away_team, home_score, away_score])
        
                            //fpl.match_detail
                            var match_id    = data.match_id
                            var goalScorers = {}
                            var assists     = {}
                            var ownGoals    = {}
                            var yellowCards = {}
                            var redCards    = {}
                            var playing     = []
        
                            var matchDetail = jsonBody[i].stats
                            for(let j = 0; j < matchDetail.length; j++){
                                var awayTeamDetails = matchDetail[j].a
                                var homeTeamDetails = matchDetail[j].h
        
                                switch (matchDetail[j].identifier) {
                                    case 'goals_scored':
                                        for(let k = 0; k<awayTeamDetails.length; k++){
                                            goalScorers[awayTeamDetails[k].element] = awayTeamDetails[k].value
                                        }
                                        for(let k = 0; k<homeTeamDetails.length; k++){
                                            goalScorers[homeTeamDetails[k].element] = homeTeamDetails[k].value
                                        }
                                        break;
                                    case 'assists':
                                        for(let k = 0; k<awayTeamDetails.length; k++){
                                            assists[awayTeamDetails[k].element] = awayTeamDetails[k].value
                                        }
                                        for(let k = 0; k<homeTeamDetails.length; k++){
                                            assists[homeTeamDetails[k].element] = homeTeamDetails[k].value
                                        }
                                        break;
                                    case 'own_goals':
                                        for(let k = 0; k<awayTeamDetails.length; k++){
                                            ownGoals[awayTeamDetails[k].element] = awayTeamDetails[k].value
                                        }
                                        for(let k = 0; k<homeTeamDetails.length; k++){
                                            ownGoals[homeTeamDetails[k].element] = homeTeamDetails[k].value
                                        }
                                        break;
                                    case 'yellow_cards':
                                        for(let k = 0; k<awayTeamDetails.length; k++){
                                            yellowCards[awayTeamDetails[k].element] = awayTeamDetails[k].value
                                        }
                                        for(let k = 0; k<homeTeamDetails.length; k++){
                                            yellowCards[homeTeamDetails[k].element] = homeTeamDetails[k].value
                                        }
                                        break;
                                    case 'red_cards':
                                        for(let k = 0; k<awayTeamDetails.length; k++){
                                            redCards[awayTeamDetails[k].element] = awayTeamDetails[k].value
                                        }
                                        for(let k = 0; k<homeTeamDetails.length; k++){
                                            redCards[homeTeamDetails[k].element] = homeTeamDetails[k].value
                                        }
                                        break;
                                    case 'bps':
                                        for(let k = 0; k<awayTeamDetails.length; k++){
                                            playing.push(awayTeamDetails[k].element)
                                        }
                                        for(let k = 0; k<homeTeamDetails.length; k++){
                                            playing.push(homeTeamDetails[k].element)
                                        }
                                        break;
                                    default:
                                        break;
                                }
                            }
        
                            for(let j = 0; j<playing.length; j++){
                                var player_id   = playing[j]
                                var squad_id    = await db.one('SELECT squad_id FROM fpl.squads WHERE player_id = $1::varchar', [player_id])
                                squad_id        = squad_id.squad_id
                                var is_starting = true
                                var goal        = (goalScorers[player_id] === undefined) ? 0 : goalScorers[player_id]
                                var assist      = (assists[player_id] === undefined) ? 0 : assists[player_id]
                                var yellow_card    = (yellowCards[player_id] === undefined) ? 0 : yellowCards[player_id]
                                var red_card    = (redCards[player_id] === undefined) ? 0 : redCards[player_id]
                                var own_goal    = (ownGoals[player_id] === undefined) ? 0 : ownGoals[player_id]
        
                                await db.one(`INSERT INTO fpl.match_details(match_id, squad_id, is_starting, goal, assist, yellow_card, red_card, own_goal) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING match_detail_id`, [match_id, squad_id, is_starting, goal, assist, yellow_card, red_card, own_goal])
                            }
        
                        }
                        console.log("Done")
                    } else {
                        // throw error the gameweek havent begun
                    }
                } else {
                    // throw error data empty
                }
            })
        })

        return `Gameweek ${latestGameweek} synced`
    } catch (err){
        throw(err)
    }
}

const calculate = async (season, gameweek) => {
    try {
        var data = await db.any(`
            SELECT md.match_detail_id, md.is_starting, md.goal, md.assist, md.yellow_card, md.red_card, md.own_goal 
            FROM ${table} m 
            JOIN fpl.match_details md ON md.match_id = m.match_id 
            WHERE m.season = $1::varchar AND m.gameweek = $2::integer
        `,[season, gameweek])
        if(data.length == 0){
            throw 'Invalid Season or Gameweek'
        }
        for(let i=0; i<data.length; i++){
            var matchDetailId   = data[i].match_detail_id
            var playerTotalPoints = 0
            playerTotalPoints += data[i].is_starting * (process.env.PLAYER_IS_STARTING_POINT || 1)
            playerTotalPoints += data[i].goal * (process.env.PLAYER_GOAL_POINT || 1)
            playerTotalPoints += data[i].assist * (process.env.PLAYER_ASSIST_POINT || 1)
            playerTotalPoints += data[i].yellow_card * (process.env.PLAYER_YELLOW_CARD_POINT || 1)
            playerTotalPoints += data[i].red_card * (process.env.PLAYER_RED_CARD_POINT || 1)
            playerTotalPoints += data[i].own_goal * (process.env.PLAYER_OWN_GOAL_POINT || 1)

            db.any(`UPDATE fpl.match_details SET total_score = $1 WHERE match_detail_id = $2`, [playerTotalPoints, matchDetailId])
        }
        return `Gameweek ${gameweek} points is being updated, changes will be applied in the next several seconds`
    } catch (err) {
        throw(err)
    }
}

module.exports = {
    getAll,
    getBySeasonAndGameweek,
    getById,
    getLatestGameweek,
    sync,
    calculate
}