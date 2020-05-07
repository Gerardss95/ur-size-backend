const express = require('express');
const Brand = require('../models/Brand');
const Shoe = require('../models/Shoe');

const router = express.Router();

router.get('/', (req, res, next) => {
	Shoe.find()
		.then(shoes => {
			return res.json(shoes);
		})
		.catch(next);
});

router.get('/add', (req, res, next) => {
	Brand.find()
		.then(brand => {
			res.status(200).json(brand);
		})
		.catch(next);
});

router.post('/add', (req, res, next) => {
	const { name, brand } = req.body;
	Shoe.create({
		name,
		brand,
	})
		.then(shoe => {
			res.status(201).json(shoe);
		})
		.catch(next);
});

router.get('/:_id', (req, res, next) => {
	const shoeID = req.params;
	Shoe.findById(shoeID)
		.then(shoe => {
			res.json(shoe);
		})
		.catch(next);
});

router.delete('/:_id', (req, res, next) => {
	const shoeID = req.params;
	Shoe.findByIdAndDelete(shoeID)
		.then(shoe => {
			res.json(shoe);
		})
		.catch(next);
});

router.put('/:_id', (req, res, next) => {
	const shoeID = req.params;
	const { name, brand } = req.body;
	Shoe.findByIdAndUpdate(shoeID, {
		name,
		brand,
	})
		.then(shoeUpdated => {
			if (shoeUpdated) {
				res.json(shoeUpdated);
			} else {
				res.status(404).json('not found');
			}
		})
		.catch(next);
});

module.exports = router;
