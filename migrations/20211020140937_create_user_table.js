
exports.up = async function(knex) {
    await knex.raw(`CREATE TABLE auth.users (
        user_id varchar NOT NULL,
        user_nm varchar NOT NULL,
        email varchar NULL,
        password varchar NOT NULL,
        role_id varchar NULL,
        CONSTRAINT users_pkey PRIMARY KEY (user_id)
    )`)
    await knex.raw(`ALTER TABLE auth.users ADD CONSTRAINT users_role_id_foreign FOREIGN KEY (role_id) REFERENCES auth.roles(role_id) ON DELETE CASCADE ON UPDATE CASCADE`)
};

exports.down = async function(knex) {
    await knex.raw(`DROP TABLE auth.users`)
};
