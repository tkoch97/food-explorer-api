const knex = require("../database");

class DishRepository {

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

    const ingredientsInsert = ingredients.map(ingredient => {
      return {
        name: ingredient,
        dish_id
      }
    });
    
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

    console.log(oldIngredients);
    
    await knex('dishes').where('id', id).update({
      name: name,
      description: description,
      category: category,
      price: price,
      updated_at: knex.fn.now()
    });
    
    await knex('ingredients').where('dish_id', id).del()
    
    if(ingredients) {
      const ingredientsInsert = ingredients.map(ingredient => {
        return {
          name: ingredient,
          dish_id: id
        }
      });
      console.log(ingredientsInsert);
      await knex('ingredients').insert(ingredientsInsert);
    } else {
      await knex('ingredients').insert(oldIngredients);
    }
  }
  
}

module.exports = DishRepository;