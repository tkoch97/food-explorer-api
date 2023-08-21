const { compare } = require('bcryptjs');
const AppError = require("../../utils/AppError");

class SessionsCreateService {
  constructor(sessionsRepository){
    this.sessionsRepository = sessionsRepository;
  }

  async initNewSession(sessionData) {

    const getUserByEmail = await this.sessionsRepository.getUserByEmail(sessionData);
    
    if(!getUserByEmail) {
      throw new AppError("Email e/ou senha incorretos!");
    } else {
      const passwordMatched = await compare(sessionData.password, getUserByEmail.password);
      if (!passwordMatched) {
        throw new AppError("Email e/ou senha incorretos!")
      }
    }
    return getUserByEmail
  }
}

module.exports = SessionsCreateService;