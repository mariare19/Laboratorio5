var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var db;
var collection;

MongoClient.connect("mongodb://mongodb.westus.azurecontainer.io:27017", { useNewUrlParser: true }).then(client => {
    db = client.db('Food');
    collection = db.collection('Recipe');
}).catch(error => console.error(error));

module.exports = {
    getFoodieRecipes: function () {
        return collection.find({}).toArray();
    },
    getFoodieRecipe: function (id) {
        return collection.find({ _id: ObjectId(id) }).toArray();
    },
    createFoodieRecipe: function (recipe) {
        return collection.insertOne(recipe);
    },
    updateFoodieRecipe: function (id, recipe) {
        return collection.updateOne({ _id: ObjectId(id) }, { $set: recipe });
    },
    deleteFoodieRecipe: function (id) {
        return collection.deleteOne({ _id: ObjectId(id) });
    }
}
