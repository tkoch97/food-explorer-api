const AppError = require("../../utils/AppError");

class DishShowService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  };

  async fetchDish(id) {

    if(!id || id === null) {
      throw new AppError("erro, parâmetro está vazio!")
    }

    const fetchedDish = await this.dishRepository.getDishById(id);
    const { dish } = fetchedDish;

    if(!dish) {
      throw new AppError("Nenhuma refeição encontrada.")
    }

    return fetchedDish;
  }
}

module.exports = DishShowService;