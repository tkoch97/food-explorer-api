const knex = require("../database");

class DishRepository {

  async findNameExist(name) {
    const dish = await knex('dishes').where('name', name).first();
    return dish;
  }

  async create({name, description, category, ingredients, price}) {
    
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
}

module.exports = DishRepository;