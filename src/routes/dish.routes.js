const {Router} = require('express');
const DishControllers = require("../controllers/dishControllers.js");
const dishRoutes = Router();
const dishControllers = new DishControllers();

dishRoutes.post("/:user_id", dishControllers.createNewDish);
dishRoutes.get("/:id", dishControllers.showDish);
dishRoutes.put("/:id", dishControllers.editDish);

module.exports = dishRoutes;