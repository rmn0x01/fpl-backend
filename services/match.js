const db    = require('../libraries/db')
const table = 'fpl.matches'
const primaryKey = 'match_id'

const https = require('https')
const { json } = require('body-parser')

const getAll = async () => {
    try{
        let data = await db.any(`SELECT * FROM ${table}`, [true])
        return data
    } catch (err){
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
                for( let i = 0; i < jsonBody.length; i++){
                    var season      = process.env.CURRENT_SEASON
                    var gameweek    = latestGameweek
                    var home_team   = jsonBody[i].team_h
                    var away_team   = jsonBody[i].team_a
                    var home_score  = jsonBody[i].team_h_score
                    var away_score  = jsonBody[i].team_a_score
                    let data = await db.one(`INSERT INTO ${table}(season,gameweek,home_team,away_team,home_score,away_score) VALUES($1, $2, $3, $4, $5, $6) RETURNING ${primaryKey}`, [season, gameweek, home_team, away_team, home_score, away_score])
                }
            })
        })

        return "Synced"
    } catch (err){
        throw(err)
    }
}

module.exports = {
    getAll,
    getLatestGameweek,
    sync
}