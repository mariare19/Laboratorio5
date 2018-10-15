var FoodieRecipes = require('../data/data');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var db;
var collection;

MongoClient.connect("mongodb://localhost:27017", { useNewUrlParser: true, poolSize: 10 }).then(client => {
    db = client.db('Food');
    collection = db.collection('Recipe');
}).catch(error => console.error(error));

module.exports = {
    getFoodieRecipes: function () {
        return collection.find({}).toArray();
    },
    getFoodieRecipe: function (id) {
        return collection.find({_id : ObjectId(id)}).toArray();
    },
    createFoodieRecipe: function (recipe) {
        // let id = hat();
        // FoodieRecipes[id] = recipe;
        // return FoodieRecipes;
        return collection.insertOne(recipe);
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
        return collection.deleteOne({_id : ObjectId(id)}, function(err, results) {
            console.log(results);
        });
        // if (FoodieRecipes[id]) {
        //     delete FoodieRecipes[id];
        //     return true;
        // } else {
        //     return false;
        // }
    }
}
