const DishRepository = require('../repositories/dishRepository');
const DishCreateService = require('../services/dishes/dishCreateService');
const DishShowService = require('../services/dishes/dishShowService');

class DishControllers {
  
  async create(request, response) {
    const dishData = request.body
    
    const dishRepository = new DishRepository();
    const dishCreateService = new DishCreateService(dishRepository);
    
    await dishCreateService.execute(dishData);
    
    return response.status(201).json("Prato cadastrado com sucesso!");
  }
  
  async show(request, response) {
    const { id } = request.params
    
    const dishRepository = new DishRepository();
    const dishShowService = new DishShowService(dishRepository);
    
    const result = await dishShowService.execute(id);
    
    return response.status(201).json(result);
  }

}

module.exports = DishControllers;