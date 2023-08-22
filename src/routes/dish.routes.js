const {Router} = require('express');
const DishControllers = require("../controllers/dishControllers.js");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated.js');
const restrictAccess = require('../middlewares/restrictAccess.js');
const dishRoutes = Router();
const dishControllers = new DishControllers();

dishRoutes.post("/", ensureAuthenticated, restrictAccess, dishControllers.createNewDish);
dishRoutes.put("/:id", ensureAuthenticated, restrictAccess, dishControllers.editDish);
dishRoutes.delete("/:id", ensureAuthenticated, restrictAccess, dishControllers.deleteDish);
dishRoutes.get("/:id", ensureAuthenticated, dishControllers.showDish);
dishRoutes.get("/", ensureAuthenticated, dishControllers.listDishes);

module.exports = dishRoutes;