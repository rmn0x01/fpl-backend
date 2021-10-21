
exports.up = async function(knex) {
    await knex.raw(`CREATE TABLE auth.roles (
        role_id varchar(50) NOT NULL,
        role_nm varchar(50) NOT NULL,
        CONSTRAINT roles_pkey PRIMARY KEY (role_id)
    )`)
};

exports.down = async function(knex) {
    await knex.raw(`DROP TABLE auth.roles`)
};
