const {Router} = require('express');
const UserControllers = require("../controllers/userControllers.js");
const userRoutes = Router();
const userControllers = new UserControllers();

userRoutes.post("/", userControllers.createUser);

module.exports = userRoutes;