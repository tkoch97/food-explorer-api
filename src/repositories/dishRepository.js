const knex = require("../database");

class DishRepository {

  async findNameExist(name) {
    const dish = await knex('dishes').where('name', name).first();
    return dish;
  }

  async create(dishData) {
    const {name, description, category, price, ingredients} = dishData;
    const [ dish_id ] = await knex('dishes').insert({
      name,
      description,
      category,
      price,
    });

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        name: ingredient,
        dish_id
      }
    });

    await knex('ingredients').insert(ingredientsInsert);
  }

  async getDishById(id){

    const dish = await knex("dishes").where({ id }).first();
    const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("name");

    return {
      ... dish,
      ingredients
    }
  }
}

module.exports = DishRepository;