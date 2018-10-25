var express = require('express');
var router = express.Router();
var method = require('../methods/methods');

router.get('/read/:id?', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	if (req.params.id) {
		let recipe = method.getFoodieRecipe(req.params.id);
		if (recipe) {
			//res.send(JSON.stringify(recipe));
			res.status(200).json(recipe)
		} else {
			res.sendStatus(404);
		}
	} else {
		let recipes = method.getFoodieRecipes();
		res.send(JSON.stringify(recipes));
	}
});

router.delete('/delete/:id', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	let eliminado = method.deleteFoodieRecipe(req.params.id);
	if (eliminado) {
		res.sendStatus(204);
	} else {
		res.sendStatus(404);
	}
});

router.put('/update/:id', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	let actualizado = method.updateFoodieRecipe(req.params.id, req.body);
	if (actualizado) {
		res.sendStatus(204);
	} else {
		res.sendStatus(404)
	}
});

router.post('/create', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	if (req.headers["content-type"] == 'application/json') {
		method.createFoodieRecipe(req.body);
		res.sendStatus(201);
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;