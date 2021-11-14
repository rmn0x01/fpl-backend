
exports.up = async function(knex){
    await knex.raw(`CREATE TABLE marketplace.user_inventories (
        user_inventory_id bigserial NOT NULL,
        user_id varchar NOT NULL,
        squad_id bigint NOT NULL,
        is_active bool NOT NULL DEFAULT false,
        CONSTRAINT user_inventories_pkey PRIMARY KEY (user_inventory_id)
    )`)
    await knex.raw(`ALTER TABLE marketplace.user_inventories ADD CONSTRAINT user_inventories_user_id_foreign FOREIGN KEY (user_id) REFERENCES auth.users(user_id) ON DELETE CASCADE ON UPDATE CASCADE`)
    await knex.raw(`ALTER TABLE marketplace.user_inventories ADD CONSTRAINT user_inventories_squad_id_foreign FOREIGN KEY (squad_Id) REFERENCES fpl.squads(squad_Id) ON DELETE CASCADE ON UPDATE CASCADE`)
}

exports.down = async function(knex) {
    await knex.raw(`DROP TABLE marketplace.user_inventories`)
};