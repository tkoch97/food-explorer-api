const DishRepository = require('../repositories/dishRepository');
const DishCreateService = require('../services/dishes/dishCreateService');
const DishShowService = require('../services/dishes/dishShowService');
const DishEditService = require('../services/dishes/dishEditService');

class DishControllers {
  
  async createNewDish(request, response) {
    const dishData = request.body
    
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
    const dishData = request.body
    const { id } = request.params

    const dishRepository = new DishRepository();
    const dishEditService = new DishEditService(dishRepository);
    
    await dishEditService.editDish(dishData, id);

    return response.status(201).json(`Prato editado com sucesso!`);
  }

}

module.exports = DishControllers;