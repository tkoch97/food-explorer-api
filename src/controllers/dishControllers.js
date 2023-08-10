const DishRepository = require('../repositories/dishRepository');
const DishCreateService = require('../services/dishes/dishCreateService');

class DishControllers {
  async create(request, response) {
    const {name, description, category, ingredients, price} = request.body;

    const dishRepository = new DishRepository();
    const dishCreateService = new DishCreateService(dishRepository);

    dishCreateService.execute({name, description, category, ingredients, price});

    return response.status(201).json("Prato cadastrado com sucesso!");
  }
}

module.exports = DishControllers;