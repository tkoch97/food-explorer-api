const AppError = require("../../utils/AppError");

class DishCreateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async createDish(dishData) {
    const checkDishExists = await this.dishRepository.findExistingName(dishData.name);

    if(checkDishExists) {
      throw new AppError("Este prato já está cadastrado.");
    }

    const dishCreated = await this.dishRepository.createNewDish(dishData)

    return dishCreated;
  }
}

module.exports = DishCreateService;