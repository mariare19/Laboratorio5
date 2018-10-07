var FoodieRecipes = require('../data/data');

module.exports = {
    getFoodieRecipes: function () {
        return FoodieRecipes;
    },
    getFoodieRecipe: function (id) {
        return FoodieRecipes[id];
    },
    createFoodieRecipe: function (recipe) {
        FoodieRecipes['FoodieRecipe3'] = recipe;
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
        } else {
            return false;
        }
    }
}
