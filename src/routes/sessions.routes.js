const {Router} = require('express');
const SessionsControllers = require("../controllers/sessionsControllers.js");
const sessionsRoutes = Router();
const sessionsControllers = new SessionsControllers();

sessionsRoutes.post("/", sessionsControllers.createNewSession);

module.exports = sessionsRoutes;