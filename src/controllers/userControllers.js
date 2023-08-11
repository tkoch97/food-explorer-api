const UserRepository = require("../repositories/userRepository");
const UserCreateService = require("../services/users/userCreateService");

class UserControllers {

  async create(request, response) {
    const {name, email, password} = request.body;

    const userRepository = new UserRepository();
    const userCreateService = new UserCreateService(userRepository);

    await userCreateService.execute({name, email, password});

    return response.status(201).json("Usuário cadastrado com sucesso!");
  }

}

module.exports = UserControllers;