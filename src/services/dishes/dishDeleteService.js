class DishDeleteService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async deleteDish(id) {
    const deletedDish = await this.dishRepository.deleteDish(id)
    return deletedDish;
  }
}

module.exports = DishDeleteService;