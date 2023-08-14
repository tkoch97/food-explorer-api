const UserRepository = require("../repositories/userRepository");
const UserCreateService = require("../services/users/userCreateService");

class UserControllers {

  async createUser(request, response) {
    const userData = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.createUser(userData);

    return response.status(201).json("Usuário cadastrado com sucesso!");
  }

}

module.exports = UserControllers;