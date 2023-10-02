const AppError = require('../utils/AppError');

function verifyUserAuthorization(request, response, next) {
  const isAdmin = request.user.role;

  if(isAdmin === 1) {
    next();
  } else {
    throw new AppError("Acesso negado. Apenas administradores.", 403);
  }
  
}

module.exports = verifyUserAuthorization;