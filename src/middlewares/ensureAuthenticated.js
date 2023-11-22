const AppError = require('../utils/AppError');
const { verify } = require('jsonwebtoken');
const authConfig = require('../configs/auth');

function ensureAuthenticated(request, response, next) {
  // variável que vai receber o token do usuário
  const authHeader = request.headers;

  if(!authHeader.cookie) {
    throw new AppError("token inexistente", 401);
  }

  //pegar o valor contido no authHeader e transformar o cód token em array
  const [, token] = authHeader.cookie.split("token=");

  //decodificar e verificar se o token é válido
  try{
    const {role, sub: user_id} = verify(token, authConfig.jwt.secret);

    request.user = {
      id: Number(user_id),
      role
    }

    return next();
  }catch{
    throw new AppError("Token inválido", 401);
  }
}

module.exports = ensureAuthenticated;