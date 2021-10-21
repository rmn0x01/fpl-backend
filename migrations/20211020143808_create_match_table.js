
exports.up = async function(knex) {
    await knex.raw(`CREATE TABLE fpl.matches (
        match_id bigserial NOT NULL,
        gameweek int4 NOT NULL,
        home_team varchar(50) NOT NULL,
        away_team varchar(50) NOT NULL,
        home_score int4 NOT NULL,
        away_score int4 NOT NULL,
        CONSTRAINT matches_pkey PRIMARY KEY (match_id)
    )`)
    await knex.raw(`ALTER TABLE fpl.matches ADD CONSTRAINT matches_home_team_foreign FOREIGN KEY (home_team) REFERENCES fpl.teams(team_id) ON DELETE CASCADE ON UPDATE CASCADE`)
    await knex.raw(`ALTER TABLE fpl.matches ADD CONSTRAINT matches_away_team_foreign FOREIGN KEY (away_team) REFERENCES fpl.teams(team_id) ON DELETE CASCADE ON UPDATE CASCADE`)
};

exports.down = async function(knex) {
    await knex.raw(`DROP TABLE fpl.matches`)
};
