const AppError = require("../../utils/AppError");

class DishShowService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  };

  async execute(id) {

    if(!id || id === null) {
      throw new AppError("erro, parâmetro está vazio!")
    }

    const result = await this.dishRepository.getDishById(id);
    const {dish} = result
    if(!dish) {
      throw new AppError("Nenhuma refeição encontrada.")
    }

    return result;
  }
}

module.exports = DishShowService;