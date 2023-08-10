const AppError = require("../../utils/AppError");

class DishCreateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute({name, description, category, ingredients, price}) {
    const checkDishExist = await this.dishRepository.findNameExist(name);

    if(checkDishExist) {
      throw new AppError("Este prato já está cadastrado.");
    }

    const dishCreated = await this.dishRepository.create({
      name,
      description,
      category,
      ingredients,
      price
    })

    return dishCreated;
  }
}

module.exports = DishCreateService;