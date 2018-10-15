var express = require('express');
var router = express.Router();
var method = require('../methods/methods');

router.get('/read/:id?', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	if (req.params.id) {
		method.getFoodieRecipe(req.params.id).then(response => {
			if (response.length > 0) {
				res.json(response)
			} else {
				res.sendStatus(404)
			}
		}).catch(error => console.error(error));
	} else {
		method.getFoodieRecipes().then(response => {
			if (response.length > 0) {
				res.json(response)
			} else {
				res.sendStatus(404)
			}
		}).catch(error => console.error(error));
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