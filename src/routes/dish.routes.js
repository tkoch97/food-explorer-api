const {Router} = require('express');
const DishControllers = require("../controllers/dishControllers.js");
const dishRoutes = Router();
const dishControllers = new DishControllers();

dishRoutes.post("/:user_id", dishControllers.createNewDish);
dishRoutes.get("/:id", dishControllers.showDish);
dishRoutes.put("/:id", dishControllers.editDish);
dishRoutes.delete("/:id", dishControllers.deleteDish);
dishRoutes.get("/", dishControllers.listDishes);

module.exports = dishRoutes;