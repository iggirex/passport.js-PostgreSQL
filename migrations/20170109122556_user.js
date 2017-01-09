
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_tbl', function(table){
    table.increments('id')
    table.string('fName')
    table.string('lName')
    table.string('userName')
    table.string('password')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_tbl')
};
