
exports.up = async function(knex){
    await knex.raw(`DROP VIEW IF EXISTS marketplace.latest_prices`)
    await knex.raw(`
        CREATE OR REPLACE VIEW marketplace.latest_prices
        AS SELECT sq.squad_id, sq.season, sq.team_id, te.team_nm, sq.player_id, pl.player_nm, pl.player_pos, table_squad_latest_price.price_id, table_squad_latest_price.price as latest_price 
        FROM fpl.squads sq 
        JOIN fpl.teams te ON sq.team_id = te.team_id 
        JOIN fpl.players pl ON sq.player_id = pl.player_id 
        LEFT JOIN (
            SELECT mp.price_id, mp.squad_id, mp.price 
            FROM marketplace.prices mp JOIN
            (SELECT mp2.squad_id, MAX(mp2.price_id) as max_price_id FROM marketplace.prices mp2 GROUP BY mp2.squad_id) table_max_price_id
            ON mp.price_id = table_max_price_id.max_price_id
        ) table_squad_latest_price
        ON sq.squad_id = table_squad_latest_price.squad_id 
        ORDER BY sq.squad_id
    `)
}

exports.down = async function(knex) {
    await knex.raw(`DROP VIEW IF EXISTS marketplace.latest_prices`)
};