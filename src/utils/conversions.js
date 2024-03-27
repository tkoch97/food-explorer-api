class Conversions {

  async TransformPriceIntoNumber(value) {

    const removeDots = value.replace(/\./g, '');
    const changeCommaToDot = removeDots.replace(',', '.');
    const TransformIntoNumericValue = parseFloat(changeCommaToDot);

    if (!isNaN(TransformIntoNumericValue)) {
        return TransformIntoNumericValue;
    }

    return null
  }
}

module.exports = Conversions;
