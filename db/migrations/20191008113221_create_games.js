
exports.up = function(knex) {
  return knex.schema.createTable('states', (table) => {
    table.uuid('uuid').primary();
    table.string('state');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('states');
};
