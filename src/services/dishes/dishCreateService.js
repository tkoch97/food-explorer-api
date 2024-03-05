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

    if(checkDishExists) {
      await diskStorage.deleteExistingFileInTmp(dishData.file.filename);
      throw new AppError("Este prato já está cadastrado.");
    } else if (requestData.ingredients.length === 0) {
      await diskStorage.deleteExistingFileInTmp(dishData.file.filename);
      throw new AppError("Por favor, insira os ingredientes do prato.");
    } else if (requestData.description === "") {
      await diskStorage.deleteExistingFileInTmp(dishData.file.filename);
      throw new AppError("Por favor, insira uma descrição para o prato");
    } else if (requestData.name === "") {
      await diskStorage.deleteExistingFileInTmp(dishData.file.filename);
      throw new AppError("Por favor, dê um nome ao prato");
    } else if (requestData.price === 0 | "") {
      await diskStorage.deleteExistingFileInTmp(dishData.file.filename);
      throw new AppError("Por favor, atribua um valor ao prato.");
    }

    const dishCreated = await this.dishRepository.createNewDish(dishData)

    return dishCreated;
  }
}

module.exports = DishCreateService;