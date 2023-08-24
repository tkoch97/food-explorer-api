const DishRepository = require('../repositories/dishRepository');
const DishCreateService = require('../services/dishes/dishCreateService');
const DishShowService = require('../services/dishes/dishShowService');
const DishEditService = require('../services/dishes/dishEditService');
const DishDeleteService = require('../services/dishes/dishDeleteService');
const DishListService = require('../services/dishes/dishListService');

class DishControllers {
  
  async createNewDish(request, response) {
    const dishData = request;
    
    const dishRepository = new DishRepository();
    const dishCreateService = new DishCreateService(dishRepository);
    
    await dishCreateService.createDish(dishData);
    
    return response.status(201).json("Prato cadastrado com sucesso!");
  }
  
  async showDish(request, response) {
    const { id } = request.params
    
    const dishRepository = new DishRepository();
    const dishShowService = new DishShowService(dishRepository);
    
    const fetchedDish = await dishShowService.fetchDish(id);
    
    return response.status(201).json(fetchedDish);
  }
  
  async editDish(request, response) {
    const dishData = request
    const { id } = request.params

    const dishRepository = new DishRepository();
    const dishEditService = new DishEditService(dishRepository);
    
    await dishEditService.editDish(dishData, id);

    return response.status(201).json(`Prato editado com sucesso!`);
  }
  
  async deleteDish(request, response) {
    const { id } = request.params;
    
    const dishRepository = new DishRepository();
    const dishDeleteService = new DishDeleteService(dishRepository);

    await dishDeleteService.deleteDish(id);
    
    return response.status(201).json(`Prato deletado com sucesso!`);
  }

  async listDishes(request, response) {
    const dishFilters = request.query;

    const dishRepository = new DishRepository();
    const dishListService = new DishListService(dishRepository);

    const listedDishes = await dishListService.listDishes(dishFilters);

    return response.status(201).json(listedDishes);
  }

}

module.exports = DishControllers;