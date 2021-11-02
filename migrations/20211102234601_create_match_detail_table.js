
exports.up = async function(knex){
    await knex.raw(`CREATE TABLE fpl.match_details (
        match_detail_id bigserial NOT NULL,
        match_id bigint NOT NULL,
        squad_id bigint NOT NULL,
        is_starting bool NOT NULL DEFAULT false,
        minute_subbed_on int4 NULL,
        minute_subbed_off int4 NULL,
        goal int4 NULL,
        assist int4 NULL,
        yellow_card int2 NULL,
        red_card int2 NULL,
        own_goal int4 NULL,
        CONSTRAINT match_details_pkey PRIMARY KEY (match_detail_id)
    )`)
    await knex.raw(`ALTER TABLE fpl.match_details ADD CONSTRAINT match_details_match_id_foreign FOREIGN KEY (match_id) REFERENCES fpl.matches(match_id) ON DELETE CASCADE ON UPDATE CASCADE`)
    await knex.raw(`ALTER TABLE fpl.match_details ADD CONSTRAINT match_details_squad_id_foreign FOREIGN KEY (squad_id) REFERENCES fpl.squads(squad_id) ON DELETE CASCADE ON UPDATE CASCADE`)
}

exports.down = async function(knex) {
    await knex.raw(`DROP TABLE fpl.match_details`)
};