const { compare } = require('bcryptjs');
const AppError = require("../../utils/AppError");
const authConfig = require("../../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsCreateService {
  constructor(sessionsRepository){
    this.sessionsRepository = sessionsRepository;
  }

  async initNewSession(sessionData) {

    const getUserByEmail = await this.sessionsRepository.getUserByEmail(sessionData);
    
    if(!getUserByEmail) {
      throw new AppError("Email e/ou senha incorretos!", 401);
    } else {
      const passwordMatched = await compare(sessionData.password, getUserByEmail.password);
      if (!passwordMatched) {
        throw new AppError("Email e/ou senha incorretos!", 401)
      }
    }

    const { secret, expiresIn } = authConfig.jwt;


    // A role é passada no espaço de payload do token
    const token = sign({role: getUserByEmail.isAdmin}, secret, {
      subject: String(getUserByEmail.id),
      expiresIn
    });

    return {getUserByEmail, token}
  }
}

module.exports = SessionsCreateService;