const knex = require("../database");
const DiskStorage = require("../providers/diskStorage");

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
    const dishText = JSON.parse(dishData.body.text);
    const dishImgFilename = dishData.file.filename;
    const diskStorage = new DiskStorage();

    // Passar a imagem de "tmp" para "uploads"
    const saveDishImgInUploads = await diskStorage.transferDishImgForUploads(dishImgFilename)

    const [ dish_id ] = await knex('dishes').insert({
      name: dishText.name,
      description: dishText.description,
      category: dishText.category,
      price: dishText.price,
      image: saveDishImgInUploads
    });

    console.log(dish_id);

    const ingredientsInsert = this._generateIngredientsInsert(dishText.ingredients, dish_id);
    
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

  async listDishes(dishFilters) {
    const { nameOrIngredient } = dishFilters;

    if(nameOrIngredient === '') {
      const listAllDishes = await knex("dishes").select('image', 'name', 'description', 'price').orderBy("name");

      return listAllDishes;
    }else{
      // função para possibilitar a filtragem de pratos tanto por nome quanto por algum ingrediente.
      
      const listedDishes = await knex('dishes')
      .select('image', 'name', 'description', 'price')
      .where('name', 'like', `%${nameOrIngredient}%`)
      .orWhereExists(function() {
        this.select('image', 'name', 'description', 'price')
            .from('ingredients')
            .whereRaw('dishes.id = ingredients.dish_id')
            .andWhere('ingredients.name', 'like', `%${nameOrIngredient}%`);
      });
  
      return listedDishes;
    }

  }
}

module.exports = DishRepository;