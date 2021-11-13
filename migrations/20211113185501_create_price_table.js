
exports.up = async function(knex){
    await knex.raw(`CREATE TABLE marketplace.prices (
        price_id bigserial NOT NULL,
        squad_id bigint NOT NULL,
        price numeric(4,2) NOT NULL,
        created_at timestamp with time zone NOT NULL,
        CONSTRAINT prices_pkey PRIMARY KEY (price_id)
    )`)
    await knex.raw(`ALTER TABLE marketplace.prices ADD CONSTRAINT prices_squad_id_foreign FOREIGN KEY (squad_id) REFERENCES fpl.squads(squad_id) ON DELETE CASCADE ON UPDATE CASCADE`)
}

exports.down = async function(knex) {
    await knex.raw(`DROP TABLE marketplace.prices`)
};