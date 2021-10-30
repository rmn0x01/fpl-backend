
exports.up = async function(knex) {
    await knex.raw(`CREATE TABLE fpl.squads (
        squad_id bigserial NOT NULL,
        season varchar(20) NOT NULL,
        team_id varchar(50) NOT NULL,
        player_id varchar(50) NOT NULL,
        CONSTRAINT squads_pkey PRIMARY KEY (squad_id)
    )`)
    await knex.raw(`ALTER TABLE fpl.squads ADD CONSTRAINT squads_team_id_foreign FOREIGN KEY (team_id) REFERENCES fpl.teams(team_id) ON DELETE CASCADE ON UPDATE CASCADE`)
    await knex.raw(`ALTER TABLE fpl.squads ADD CONSTRAINT squads_player_id_foreign FOREIGN KEY (player_id) REFERENCES fpl.players(player_id) ON DELETE CASCADE ON UPDATE CASCADE`)
};

exports.down = async function(knex) {
    await knex.raw(`DROP TABLE fpl.squads`)
};
