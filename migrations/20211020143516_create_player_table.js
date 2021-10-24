
exports.up = async function(knex) {
    await knex.raw(`CREATE TABLE fpl.players (
        player_id varchar(50) NOT NULL,
        player_nm varchar(50) NOT NULL,
        player_img text NULL,
        team_id varchar(50) NOT NULL,
        CONSTRAINT players_pkey PRIMARY KEY (player_id)
    )`)
    await knex.raw(`ALTER TABLE fpl.players ADD CONSTRAINT players_team_id_foreign FOREIGN KEY (team_id) REFERENCES fpl.teams(team_id) ON DELETE CASCADE ON UPDATE CASCADE`)
};

exports.down = async function(knex) {
    await knex.raw(`DROP TABLE fpl.players`)
};
