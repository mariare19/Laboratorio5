var express = require('express');
var router = express.Router();
var method = require('../methods/methods');
var redis = require('redis');
var client = redis.createClient();
const Joi = require('joi');
const expressJoi = require('express-joi-validator');

const schemaPut = {
	body: {
		titulo: Joi.string().required(),
		descripcion: Joi.string().required(),
		ingredientes: Joi.array().required(),
		dificultad: Joi.string().required(),
		porciones: Joi.string().required(),
		urlimg: Joi.string().required()
	},
	params: {
		id: Joi.string().required().min(24).max(24)
	}
}

const schemaPost = {
	body: {
		titulo: Joi.string().required(),
		descripcion: Joi.string().required(),
		ingredientes: Joi.array().required(),
		dificultad: Joi.string().required(),
		porciones: Joi.string().required(),
		urlimg: Joi.string().required()
	}
}

const schemaId = {
	params: {
		id: Joi.string().min(24).max(24)
	}
}

router.get('/:id?', expressJoi(schemaId), function (req, res) {
	if (req.params.id) {
		client.get(req.params.id, function (err, reply) {
			if (reply) {
				res.status(200).json(JSON.parse(reply));
			} else {
				method.getFoodieRecipe(req.params.id).then(response => {
					if (response.length > 0) {
						client.set(req.params.id, JSON.stringify(response), 'EX', 5);
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
			}
		});
	} else {
		client.get('recipes', function (err, reply) {
			if (reply) {
				res.status(200).json(JSON.parse(reply));
			} else {
				method.getFoodieRecipes().then(response => {
					if (response.length > 0) {
						client.set('recipes', JSON.stringify(response), 'EX', 5);
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
			}
		});
	}
});

router.delete('/:id', expressJoi(schemaId), function (req, res) {
	method.deleteFoodieRecipe(req.params.id).then(response => {
		if (response.result.ok && response.result.n > 0) {
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

router.put('/:id', expressJoi(schemaPut), function (req, res) {
	method.updateFoodieRecipe(req.params.id, req.body).then(response => {
		if (response.result.ok && response.result.nModified > 0) {
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

router.post('', expressJoi(schemaPost), function (req, res) {
	if (req.headers["content-type"] == 'application/json') {
		method.createFoodieRecipe(req.body).then(response => {
			if (response.result.ok && response.result.n > 0) {
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