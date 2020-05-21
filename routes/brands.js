const express = require('express');
const Brand = require('../models/Brand');
const Sneaker = require('../models/Sneaker');

const router = express.Router();

router.get('/', (req, res, next) => {
	Brand.find()
		.then(brands => {
			return res.json(brands);
		})
		.catch(next);
});

router.get('/:_id', (req, res, next) => {
	const brandID = req.params;
	Sneaker.find({ brand: brandID })
		.then(sneakers => {
			Brand.findById(brandID)
				.then(brand => {
					res.json({ brand, sneakers });
				})
				.catch(next);
		})
		.catch(next);
});

module.exports = router;
