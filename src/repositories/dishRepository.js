const knex = require("../database");

class DishRepository {

  _generateIngredientsInsert(ingredients, dish_id) {
    return ingredients.map(ingredient => {
      return {
        name: ingredient,
        dish_id
      };
    });
  }

  async findExistingName(name) {
    const dish = await knex('dishes').where('name', name).first();
    return dish;
  }

  async createNewDish(dishData) {
    const {name, description, category, price, ingredients} = dishData;
    const [ dish_id ] = await knex('dishes').insert({
      name,
      description,
      category,
      price,
    });

    const ingredientsInsert = this._generateIngredientsInsert(ingredients, dish_id);
    
    await knex('ingredients').insert(ingredientsInsert);
  }
  
  async getDishById(id){
    
    const dish = await knex("dishes").where('id', id).first();
    const ingredients = await knex("ingredients").where({dish_id: id}).orderBy("name");
    
    return {
      dish,
      ingredients
    }
  }
  
  async insertNewDataInDishAndIngredients(dishData, id) {
    const {name, description, category, price, ingredients} = dishData;
    const oldIngredients = await knex("ingredients").where({dish_id: id}).orderBy("name");
    
    await knex('dishes').where('id', id).update({
      name,
      description,
      category,
      price,
      updated_at: knex.fn.now()
    });
    
    await knex('ingredients').where('dish_id', id).del()
    
    if(ingredients) {
      const ingredientsInsert = this._generateIngredientsInsert(ingredients, id);
      await knex('ingredients').insert(ingredientsInsert);
    } else {
      await knex('ingredients').insert(oldIngredients);
    }
  }

  async deleteDish(id) {
    await knex('dishes').where('id', id).del();
  }
  
}

module.exports = DishRepository;