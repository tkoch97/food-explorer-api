const AppError = require("../../utils/AppError");

class DishCreateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async execute(dishData) {
    const checkDishExist = await this.dishRepository.findNameExist(dishData.name);
    if(checkDishExist) {
      throw new AppError("Este prato já está cadastrado.");
    }

    const dishCreated = await this.dishRepository.create(dishData)

    return dishCreated;
  }
}

module.exports = DishCreateService;