const { hash } = require("bcryptjs");

exports.seed = async function(knex) {
  const hashedPassword = await hash("000000", 8);
  await knex('users').del()
  await knex('users').insert([
    {
      name: 'admin',
      email: 'admin@email.com',
      password: hashedPassword,
      isAdmin: true
    }
  ]);
};
