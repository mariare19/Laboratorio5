var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var redis = require('redis');
var client = redis.createClient();
const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);
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
        if (client.get('1')) {
            return getAsync('1');
        } else {
            return collection.find({ _id: ObjectId(id) }).toArray();
        }
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
