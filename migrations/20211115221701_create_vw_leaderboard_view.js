
exports.up = async function(knex){
    await knex.raw(`DROP VIEW IF EXISTS marketplace.vw_leaderboard`)
    await knex.raw(`
        CREATE OR REPLACE VIEW marketplace.vw_leaderboard
        AS SELECT ldb.season, ldb.gameweek, ldb.user_id, ldb.user_nm, SUM(ldb.total_score) AS score FROM
        (SELECT ulp.*, u.user_nm, md.total_score 
        FROM marketplace.user_locked_players ulp
        JOIN auth.users u ON ulp.user_id = u.user_id 
        LEFT JOIN fpl.match_details md 
        ON ulp.match_detail_id = md.match_detail_id) ldb
        GROUP BY ldb.season, ldb.gameweek, ldb.user_id, ldb.user_nm
        ORDER BY ldb.season, ldb.gameweek, score
    `)
}

exports.down = async function(knex) {
    await knex.raw(`DROP VIEW IF EXISTS marketplace.vw_leaderboard`)
};