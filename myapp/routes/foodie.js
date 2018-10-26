var express = require('express');
var router = express.Router();
var method = require('../methods/methods');

router.get('/:id?', function (req, res) {
	if (req.params.id) {
		method.getFoodieRecipe(req.params.id).then(response => {
			if (response.length > 0) {
				res.status(200).json(response);
			} else {
				res.status(404).send();
			}
		}).catch(err => {
			if (res.headersSent) {
				return next(err);
			}
			res.status(500).json({ error: err });
		});
	} else {
		method.getFoodieRecipes().then(response => {
			if (response.length > 0) {
				res.status(200).json(response)
			} else {
				res.status(404).send();
			}
		}).catch(err => {
			if (res.headersSent) {
				return next(err);
			}
			res.status(500).json({ error: err });
		});
	}
});

router.delete('/:id', function (req, res) {
	method.deleteFoodieRecipe(req.params.id).then(response => {
		if (response.result.ok) {
			res.status(204).send();
		} else {
			res.status(404).send();
		}
	}).catch(err => {
		if (res.headersSent) {
			return next(err);
		}
		res.status(500).json({ error: err });
	});
});

router.put('/:id', function (req, res) {
	method.updateFoodieRecipe(req.params.id, req.body).then(response => {
		if (response.result.ok) {
			res.status(204).send();
		} else {
			res.status(404).send();
		}
	}).catch(err => {
		if (res.headersSent) {
			return next(err);
		}
		res.status(500).json({ error: err });
	});
});

router.post('', function (req, res) {
	if (req.headers["content-type"] == 'application/json') {
		method.createFoodieRecipe(req.body).then(response => {
			if (response.result.ok) {
				res.status(201).send();
			} else {
				res.status(404).send();
			}
		}).catch(err => {
			if (res.headersSent) {
				return next(err);
			}
			res.status(500).json({ error: err });
		});
	} else {
		res.status(404).send();
	}
});

module.exports = router;