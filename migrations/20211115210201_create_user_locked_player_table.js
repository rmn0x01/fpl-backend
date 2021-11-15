
exports.up = async function(knex){
    await knex.raw(`CREATE TABLE marketplace.user_locked_players (
        user_locked_player_id bigserial NOT NULL,
        season varchar(20) NOT NULL,
        gameweek int4 NOT NULL,
        user_id varchar NOT NULL,
        squad_id bigint NOT NULL,
        match_detail_id bigint NULL,
        CONSTRAINT user_locked_players_pkey PRIMARY KEY (user_locked_player_id)
    )`)
    await knex.raw(`ALTER TABLE marketplace.user_locked_players ADD CONSTRAINT user_locked_players_user_id_foreign FOREIGN KEY (user_id) REFERENCES auth.users(user_id) ON DELETE CASCADE ON UPDATE CASCADE`)
    await knex.raw(`ALTER TABLE marketplace.user_locked_players ADD CONSTRAINT user_locked_players_squad_id_foreign FOREIGN KEY (squad_id) REFERENCES fpl.squads(squad_id) ON DELETE CASCADE ON UPDATE CASCADE`)
    await knex.raw(`ALTER TABLE marketplace.user_locked_players ADD CONSTRAINT user_locked_players_match_detail_id_foreign FOREIGN KEY (match_detail_id) REFERENCES fpl.match_details(match_detail_id) ON DELETE CASCADE ON UPDATE CASCADE`)
}

exports.down = async function(knex) {
    await knex.raw(`DROP TABLE marketplace.user_locked_players`)
};