const AppError = require('../utils/AppError');

function restrictAccess(request, response, next) {
  const isAdmin = request.user.role;
  console.log(isAdmin);

  if(isAdmin === 1) {
    next();
  } else {
    throw new AppError("Acesso negado. Apenas administradores.", 403);
  }
  
}

module.exports = restrictAccess;