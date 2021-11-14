
exports.up = async function(knex){
    await knex.raw(`CREATE TABLE marketplace.transaction_logs (
        transaction_log_id bigserial NOT NULL,
        user_id varchar NOT NULL,
        price_id bigint NOT NULL,
        activity varchar(10) NOT NULL,
        created_at timestamp with time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT transaction_logs_pkey PRIMARY KEY (transaction_log_id)
    )`)
    await knex.raw(`ALTER TABLE marketplace.transaction_logs ADD CONSTRAINT transaction_logs_user_id_foreign FOREIGN KEY (user_id) REFERENCES auth.users(user_id) ON DELETE CASCADE ON UPDATE CASCADE`)
    await knex.raw(`ALTER TABLE marketplace.transaction_logs ADD CONSTRAINT transaction_logs_price_id_foreign FOREIGN KEY (price_id) REFERENCES marketplace.prices(price_id) ON DELETE CASCADE ON UPDATE CASCADE`)
}

exports.down = async function(knex) {
    await knex.raw(`DROP TABLE marketplace.transaction_logs`)
};