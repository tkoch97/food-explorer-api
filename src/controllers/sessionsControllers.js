const SessionsCreateService = require("../services/sessions/sessionsCreateService");
const SessionsRepository = require("../repositories/sessionsRepository");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");

class SessionsControllers {
  async createNewSession(request, response) {
    const sessionData = request.body;

    const sessionsRepository = new SessionsRepository;
    const sessionsCreateService = new SessionsCreateService(sessionsRepository);

    const userData = await sessionsCreateService.initNewSession(sessionData);
    
    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({role: userData.getUserByEmail.role}, secret, {
      subject: String(userData.getUserByEmail.id),
      expiresIn
    });

    response.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 15 * 60 * 1000
    });

    delete userData.getUserByEmail.password

    response.status(201).json(userData);
  }
}

module.exports = SessionsControllers;