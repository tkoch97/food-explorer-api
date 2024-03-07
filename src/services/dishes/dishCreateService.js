const AppError = require("../../utils/AppError");
const DiskStorage = require("../../providers/diskStorage");

class DishCreateService {
  constructor(dishRepository) {
    this.dishRepository = dishRepository;
  }

  async createDish(dishData) {
    const diskStorage = new DiskStorage();
    const requestData = JSON.parse(dishData.body.text);
    const checkDishExists = await this.dishRepository.findExistingName(requestData.name);

    if (checkDishExists) {
      await diskStorage.deleteExistingFileInTmp(dishData.file.filename);
      throw new AppError("Este prato já está cadastrado.");
    }

    if (requestData.ingredients.length === 0) {
      await diskStorage.deleteExistingFileInTmp(dishData.file.filename);
      throw new AppError("Por favor, insira os ingredientes do prato.");
    }

    if (requestData.description === "" || requestData.name === "" || 
    requestData.price === "" || requestData.category === "") {
      await diskStorage.deleteExistingFileInTmp(dishData.file.filename);
      throw new AppError("Por favor, preencha todos os campos do prato.");
    }

    const dishCreated = await this.dishRepository.createNewDish(dishData)

    return dishCreated;
  }
}

module.exports = DishCreateService;