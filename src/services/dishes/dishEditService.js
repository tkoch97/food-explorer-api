const AppError = require("../../utils/AppError");

class DishEditService {

  constructor(dishRepository){
    this.dishRepository = dishRepository
  }

  async editDish(dishData, id) {
    
    const checkDishExists = await this.dishRepository.getDishById(id);
    const { dish } = checkDishExists;

    if(!dish) {
      throw new AppError("Refeição não encontrada");
    }

    console.log(dishData.ingredients);

    const editedDish = await this.dishRepository.insertNewDataInDishAndIngredients(dishData, id);

    return editedDish;
  }
}

module.exports = DishEditService;