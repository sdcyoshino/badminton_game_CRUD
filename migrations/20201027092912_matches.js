require('dotenv').config();

const {
  MATCHES_TABLE
} = process.env;

exports.up = function(knex) {
  return knex.schema.createTable(MATCHES_TABLE, function(t) {
    t.increments('id').primary();
    t.integer('team_one').defaultTo(0);
    t.integer('team_two').defaultTo(0);
    t.integer('set_number').defaultTo(1);
    t.datetime('time_started', 6).defaultTo(knex.fn.now(6));
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists(MATCHES_TABLE);
};
