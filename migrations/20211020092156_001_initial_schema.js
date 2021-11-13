
exports.up = async function(knex) {
    await knex.raw(`CREATE SCHEMA auth`)
    await knex.raw(`CREATE SCHEMA fpl`)
    await knex.raw(`CREATE SCHEMA marketplace`)
};

exports.down = async function(knex) {
    await knex.raw(`DROP SCHEMA auth`)
    await knex.raw(`DROP SCHEMA fpl`)
    await knex.raw(`CREATE SCHEMA marketplace`)
};
