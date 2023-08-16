class DishListService {

  constructor(dishRepository){
    this.dishRepository = dishRepository
  }

  async listDishes(dishFilters) {

    const listedDishes = await this.dishRepository.listDishes(dishFilters)
    return listedDishes;
  }

}

module.exports = DishListService;