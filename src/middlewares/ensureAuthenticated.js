const AppError = require('../utils/AppError');
const { verify } = require('jsonwebtoken');
const authConfig = require('../configs/auth');

function ensureAuthenticated(request, response, next) {
  // variável que vai receber o token do usuário
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError("token inexistente", 401);
  }

  //pegar o valor contido no authHeader e transformar o cód token em array
  const [, token] = authHeader.split(" ");

  //decodificar e verificar se o token é válido
  try{
    const decodedToken = verify(token, authConfig.jwt.secret);
    const subData = JSON.parse(decodedToken.sub);

    //utilizar os dados do token decodificado
    const user_id = subData.id;
    const isAdmin = subData.role;

    request.user = {
      id: Number(user_id),
      role: Number(isAdmin)
    }

    return next();
  }catch{
    throw new AppError("Token inválido", 401);
  }
}

module.exports = ensureAuthenticated;