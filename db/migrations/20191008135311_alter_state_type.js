
exports.up = function(knex) {
  return knex.schema.table('states', table => {
    table.text('state', 'longtext').alter();
  });
};

exports.down = function(knex) {
  return knex.schema.table('states', table => {
    table.string('state').alter();
  });
};
