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
    
    // Para passar mais de um atributo do usuário, tive que criar um objeto JSON e passar no token
    const userInfo = {
      id: getUserByEmail.id,
      role: getUserByEmail.isAdmin
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: JSON.stringify(userInfo),
      expiresIn
    });

    return {getUserByEmail, token}
  }
}

module.exports = SessionsCreateService;