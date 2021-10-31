
exports.up = async function(knex) {
    await knex.raw(`CREATE TABLE fpl.players (
        player_id varchar(50) NOT NULL,
        player_nm varchar(50) NOT NULL,
        player_pos varchar(20) NOT NULL,
        player_img text NULL,
        CONSTRAINT players_pkey PRIMARY KEY (player_id)
    )`)
};

exports.down = async function(knex) {
    await knex.raw(`DROP TABLE fpl.players`)
};
