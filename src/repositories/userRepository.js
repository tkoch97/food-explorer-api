const knex = require("../database");

class UserRepository {

  async findExistingEmail(email) {
    const user = await knex('users').where('email', email).first();
    return user;
  }

  async createUser({name, email, password}) {
    const userId = await knex('users').insert({
      name,
      email,
      password
    });

    return {id: userId};
  }
}

module.exports = UserRepository;

