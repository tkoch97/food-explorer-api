const SessionsCreateService = require("../services/sessions/sessionsCreateService");
const SessionsRepository = require("../repositories/sessionsRepository");

class SessionsControllers {
  async createNewSession(request, response) {
    const sessionData = request.body;

    const sessionsRepository = new SessionsRepository;
    const sessionsCreateService = new SessionsCreateService(sessionsRepository);

    const userData = await sessionsCreateService.initNewSession(sessionData);

    response.cookie("token", userData.token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 15 * 60 * 1000
    });

    delete userData.getUserByEmail.password

    response.status(201).json(userData.getUserByEmail);
  }
}

module.exports = SessionsControllers;