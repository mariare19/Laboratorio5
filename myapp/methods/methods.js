var FoodieRecipes = require('../data/data');

module.exports = {
    getFoodieRecipes: function () {
        return FoodieRecipes;
    },
    getFoodieRecipe: function (id) {
        return FoodieRecipes[id];
    },
    createFoodieRecipe: function (recipe) {

    }, updateFoodieRecipe: function (id, recipe) {

    }, deleteFoodieRecipe: function (id) {

    }
}
