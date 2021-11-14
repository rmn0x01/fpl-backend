
exports.up = async function(knex){
    await knex.raw(`CREATE TABLE marketplace.user_credits (
        user_credit_id bigserial NOT NULL,
        user_id varchar NOT NULL,
        credit numeric(6,2) NOT NULL,
        updated_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT user_credits_pkey PRIMARY KEY (user_credit_id)
    )`)
    await knex.raw(`ALTER TABLE marketplace.user_credits ADD CONSTRAINT user_credits_user_id_foreign FOREIGN KEY (user_id) REFERENCES auth.users(user_id) ON DELETE CASCADE ON UPDATE CASCADE`)
}

exports.down = async function(knex) {
    await knex.raw(`DROP TABLE marketplace.user_credits`)
};