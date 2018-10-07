var express = require('express');
var router = express.Router();
var method = require('../methods/methods');

/* GET users listing. */
router.get('/', function (req, res, next) {
	let recipes = method.getFoodieRecipes();
	res.send(JSON.stringify(recipe));
});

router.get('/:id', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	let recipe = method.getFoodieRecipe(req.params.id);
	res.send(JSON.stringify(recipe));
});

module.exports = router;