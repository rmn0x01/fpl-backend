
exports.up = async function(knex) {
    await knex.raw(`CREATE TABLE fpl.teams (
        team_id varchar(50) NOT NULL,
        team_nm varchar(50) NOT NULL,
        is_on_pl bool NOT NULL DEFAULT true,
        CONSTRAINT teams_pkey PRIMARY KEY (team_id)
    )`)
};

exports.down = async function(knex) {
    await knex.raw(`DROP TABLE fpl.teams`)
};
