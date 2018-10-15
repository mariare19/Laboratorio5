var MongoClient = require('mongodb').MongoClient;
let db;
let collection;

// MongoClient.connect("mongodb://localhost:27017/Food", { useNewUrlParser: true }, function (err, db) {

//     db.db("Food").collection('Recipe', function (err, collection) {
//         collection.find().toArray(function (err, items) {
//             if (err) throw err;
//             console.log(items);
//         });
//     });
// });

MongoClient.connect("mongodb://localhost:27017/Food", { useNewUrlParser: true, poolSize: 10 }).then(client => {
    db = client.db('Food');
    collection = db.collection('Recipe');
}).catch(error => console.error(error));

module.exports = {
    FoodieRecipe1: {
        titulo: "Brownies con Nutella",
        descripcion: "jasldfkj adhflakdjf aldkfla df",
        dificultad: "Facil",
        porciones: "3",
        ingredientes: [
            "Leche",
            "Huevos"
        ]
    },
    FoodieRecipe2: {
        titulo: "Pastel tres leches",
        descripcion: "jasldfkj adhflakdjf aldkfla df",
        dificultad: "Dificil",
        porciones: "10",
        ingredientes: [
            "Leche",
            "Leche Evaporada"
        ]
    }
}