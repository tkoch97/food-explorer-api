const { hash } = require("bcryptjs")
const AppError = require("../../utils/AppError");

class UserCreateService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  async createUser(userData) {

    const {name, email, password} = userData;

    const checkUserExist = await this.userRepository.findEmailExist(email);

    console.log(checkUserExist);

    if(checkUserExist){
      throw new AppError("Este email já está em uso.");
    }

    const hashedPassword = await hash(password, 8);

    const userCreated = await this.userRepository.createUser({
      name,
      email,
      password: hashedPassword,
    });

    return userCreated;
  }
}

module.exports = UserCreateService;

