const {Router} = require('express');

const userRoutes = require("./user.routes");
const dishRoutes = require("./dish.routes");

const routes = Router();

routes.use("/user", userRoutes);
routes.use("/dish", dishRoutes);

module.exports = routes;