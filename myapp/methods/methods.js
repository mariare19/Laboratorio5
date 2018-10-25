var FoodieRecipes = require('../data/data');
var hat = require('hat');

module.exports = {
    getFoodieRecipes: function () {
        return FoodieRecipes;
    },
    getFoodieRecipe: function (id) {
        const recipe = FoodieRecipes.filter(r => r.id === id)
        return recipe ? FoodieRecipes[id] : null;
    },
    createFoodieRecipe: function (recipe) {
        let id = hat();
        FoodieRecipes[id] = recipe;
        return FoodieRecipes;
    },
    updateFoodieRecipe: function (id, recipe) {
        if (FoodieRecipes[id]) {
            FoodieRecipes[id] = recipe;
            return true;
        } else {
            return false;
        }
    },
    deleteFoodieRecipe: function (id) {
        if (FoodieRecipes[id]) {
            delete FoodieRecipes[id];
            return true;
        } 
        return false
    }
}
