exports.up = knex => knex.schema.createTable('dishes', table => {
  table.increments('id').primary();
  table.text('name');
  table.text('description');
  table.text('image');
  table.timestamp('created_at').default(knex.fn.now());
  table.timestamp('updated_at').default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable('users');