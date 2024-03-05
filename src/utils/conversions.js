const AppError = require("./AppError");

class Conversions {

  async TransformPriceIntoNumber(value) {

    const removeDots = value.replace(/\./g, '');
    const changeCommaToDot = removeDots.replace(',', '.');
    const TransformIntoNumericValue = parseFloat(changeCommaToDot);

    if (!isNaN(TransformIntoNumericValue)) {
        return TransformIntoNumericValue;
    } else {
        throw new AppError("Falha ao enviar solicitação, por favor, tente mais tarde.");
    }
  }
}

module.exports = Conversions;
