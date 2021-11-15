const leaderboardService = require('../services/leaderboard')

const getOverviewByGameweek = async (req, res) => {
    try {
        const season = req.params.season
        const gameweek = req.params.gameweek
        let result = await leaderboardService.getOverviewByGameweek(season, gameweek)
        res.status(200).json({
            season: season,
            gameweek: gameweek,
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

const getDetailById = async (req, res) => {
    try {
        const season = req.params.season
        const gameweek = req.params.gameweek
        const userId = req.params.user_id
        let result = await leaderboardService.getDetailById(season, gameweek, userId)
        res.status(200).json({
            season: season,
            gameweek: gameweek,
            user_id: userId,
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({
            message: err.message || err
        })
    }
}

module.exports = {
    getOverviewByGameweek,
    getDetailById,
}