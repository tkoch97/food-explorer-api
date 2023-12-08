const AppError = require('../utils/AppError');

function verifyUserAuthorization(roleToVerify) {
  
  return (req, resp, next) => {

    const {role} = req.user;

    if(!roleToVerify.includes(role)) {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  }

  
}

module.exports = verifyUserAuthorization;