const knex = require("../database");
const DiskStorage = require("../providers/diskStorage");
const Conversions = require("../utils/conversions");
const AppError = require("../utils/AppError");

class DishRepository {
  constructor() {
    this.diskStorage = new DiskStorage();
    this.conversions = new Conversions();
  }

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
    const dishImgFilename = dishData.file ? dishData.file.filename : null;

    // Passar a imagem de "tmp" para "uploads"
    const saveDishImgInUploads = await this.diskStorage.transferDishImgForUploads(dishImgFilename)
    
    const transformedPrice = await this.conversions.TransformPriceIntoNumber(dishText.price);

    const [ dish_id ] = await knex('dishes').insert({
      name: dishText.name,
      description: dishText.description,
      category: dishText.category,
      price: transformedPrice,
      image: saveDishImgInUploads
    });

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
    const atuallDish = await knex("dishes").where('id', id).first();
    const newDishText = JSON.parse(dishData.body.text);
    const dishImgFilename = dishData.file ? dishData.file.filename : null;
    const oldIngredients = await knex("ingredients").where('dish_id', id).orderBy("name");
    const transformedPrice = await this.conversions.TransformPriceIntoNumber(newDishText.price);

    const updateDishData = {
      name: newDishText.name ? newDishText.name : atuallDish.name,
      description: newDishText.description ? newDishText.description : atuallDish.description,
      category: newDishText.category ? newDishText.category : atuallDish.category,
      price: transformedPrice ? transformedPrice : atuallDish.price,
      updated_at: knex.fn.now()
    }

    // Deletar imagem existente no banco
    if(dishImgFilename && atuallDish.image) {
      console.log("imaem atual =>", atuallDish.image)
      await this.diskStorage.deleteExistingFileInUploads(atuallDish.image);
      // Passar a imagem nova de "tmp" para "uploads"
      const saveDishImgInUploads = await this.diskStorage.transferDishImgForUploads(dishImgFilename)

      // Inserir nova imagem nos dados da refeição a serem editados
      updateDishData.image = saveDishImgInUploads
    } else {
      // Manter imagem atual nos dados da refeição
      updateDishData.image = atuallDish.image;
    }

    await knex('dishes').where('id', id).update(updateDishData);

    const ingredientsInsert = newDishText.ingredients ? 
    this._generateIngredientsInsert(newDishText.ingredients, id) : 
    oldIngredients;

    await knex('ingredients').where('dish_id', id).del()
    
    if(ingredientsInsert.length) {
      await knex('ingredients').insert(ingredientsInsert);
    }
  }

  async deleteDish(id) {
    const dishData = await knex('dishes').where('id', id);
    const dishImg = dishData[0].image;

    await knex('dishes').where('id', id).del();

    this.diskStorage.deleteExistingFileInUploads(dishImg);
  }

  async listDishes(dishFilters) {
    const { nameOrIngredient } = dishFilters;

    if(nameOrIngredient === '' || !nameOrIngredient) {
      const listAllDishes = await knex("dishes").select('id', 'image', 'name', 'description', 'price').orderBy("name");

      return listAllDishes;
    }else{
      // função para possibilitar a filtragem de pratos tanto por nome quanto por algum ingrediente.
      
      const listedDishes = await knex('dishes')
      .select('id', 'image', 'name', 'description', 'price')
      .where('name', 'like', `%${nameOrIngredient}%`)
      .orWhereExists(function() {
        this.select('id', 'image', 'name', 'description', 'price')
            .from('ingredients')
            .whereRaw('dishes.id = ingredients.dish_id')
            .andWhere('ingredients.name', 'like', `%${nameOrIngredient}%`);
      });
      
      if(listedDishes.length === 0){
        throw new AppError("Nenhum prato encontrado com esse nome ou ingrediente", 403)
      } else {
        return listedDishes;
      }
    }

  }
}

module.exports = DishRepository;