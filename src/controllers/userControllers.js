class UserControllers {

  create(request, response) {
    const {name, email, password} = request.body;
    response.json({name, email, password});
  }

}

module.exports = UserControllers;