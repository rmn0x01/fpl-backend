
exports.up = async function(knex){
    await knex.raw(`DROP VIEW IF EXISTS marketplace.vw_transaction_logs`)
    await knex.raw(`
        CREATE OR REPLACE VIEW marketplace.vw_transaction_logs
        AS SELECT tl.transaction_log_id, tl.user_id, u.user_nm, tl.created_at, tl.price_id, p.price, tl.activity, t.team_id, t.team_nm, p2.player_id, p2.player_nm 
        FROM marketplace.transaction_logs tl 
        JOIN auth.users u ON tl.user_id = u.user_id 
        JOIN marketplace.prices p ON tl.price_id = p.price_id 
        JOIN fpl.squads s ON p.squad_id = s.squad_id 
        JOIN fpl.teams t ON s.team_id = t.team_id 
        JOIN fpl.players p2 ON s.player_id = p2.player_id 
        ORDER BY tl.transaction_log_id 
    `)
}

exports.down = async function(knex) {
    await knex.raw(`DROP VIEW IF EXISTS marketplace.vw_transaction_logs`)
};