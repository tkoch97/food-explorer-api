const {Router} = require('express');
const multer = require("multer");
const uploadConfig = require("../configs/upload");
const DishControllers = require("../controllers/dishControllers.js");
const ensureAuthenticated = require('../middlewares/ensureAuthenticated.js');
const restrictAccess = require('../middlewares/restrictAccess.js');

const dishRoutes = Router();
const upload = multer(uploadConfig.MULTER);
const dishControllers = new DishControllers();

dishRoutes.post("/", ensureAuthenticated, restrictAccess, upload.single("dishImg"), dishControllers.createNewDish);
dishRoutes.put("/:id", ensureAuthenticated, restrictAccess, upload.single("dishImg"), dishControllers.editDish);
dishRoutes.delete("/:id", ensureAuthenticated, restrictAccess, dishControllers.deleteDish);
dishRoutes.get("/:id", ensureAuthenticated, dishControllers.showDish);
dishRoutes.get("/", ensureAuthenticated, dishControllers.listDishes);

module.exports = dishRoutes;