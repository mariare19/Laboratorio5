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
	method.deleteFoodieRecipe(req.params.id).then(response => {
		if (response.result.ok) {
			res.sendStatus(204);
		} else {
			res.sendStatus(404);
		}
	}).catch(error => console.error(error));
});

router.put('/update/:id', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	method.updateFoodieRecipe(req.params.id, req.body).then(response => {
		console.log(response);
		if (response.result.ok) {
			res.sendStatus(204);
		} else {
			res.sendStatus(404);
		}
	}).catch(error => console.error(error));
});

router.post('/create', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	if (req.headers["content-type"] == 'application/json') {
		method.createFoodieRecipe(req.body).then(response => {
			if (response.result.ok) {
				res.sendStatus(201);
			} else {
				res.sendStatus(404);
			}
		}).catch(error => console.error(error));
	} else {
		res.sendStatus(404);
	}
});

module.exports = router;