const knex = require("../database");

class SessionsRepository {

  async getUserByEmail(sessionData) {
    const userEmail = await knex('users').where('email', sessionData.email).first();
    return userEmail;
  }

}

module.exports=SessionsRepository;