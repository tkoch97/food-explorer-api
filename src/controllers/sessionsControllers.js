const SessionsCreateService = require("../services/sessions/sessionsCreateService");
const SessionsRepository = require("../repositories/sessionsRepository");

class SessionsControllers {
  async createNewSession(request, response) {
    const sessionData = request.body;

    const sessionsRepository = new SessionsRepository;
    const sessionsCreateService = new SessionsCreateService(sessionsRepository);

    const userData = await sessionsCreateService.initNewSession(sessionData);

    response.status(201).json(userData);
  }
}

module.exports = SessionsControllers;