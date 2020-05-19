const express = require('express');
const Brand = require('../models/Brand');
const Sneaker = require('../models/Sneaker');

const router = express.Router();

router.get('/', (req, res, next) => {
  Sneaker.find()
  .populate('brand')
		.then(shoes => {
			return res.status(200).json(shoes);
		})
		.catch(next);
});

router.post('/add', (req, res, next) => {
	const { name, brand, info, image } = req.body;
	Sneaker.create({
		name,
		brand,
		info,
		image,
	})
		.then(shoe => {
			res.status(201).json(shoe);
		})
		.catch(next);
});

router.get('/:_id', (req, res, next) => {
	const shoeID = req.params;
	Sneaker.findById(shoeID)
		.then(shoe => {
			res.json(shoe);
		})
		.catch(next);
});

router.delete('/:_id', (req, res, next) => {
	const shoeID = req.params;
	Sneaker.findByIdAndDelete(shoeID)
		.then(shoe => {
			res.json(shoe);
		})
		.catch(next);
});

router.put('/:_id', (req, res, next) => {
	const shoeID = req.params;
	const { name, brand } = req.body;
	Sneaker.findByIdAndUpdate(shoeID, {
		name,
    brand,
    info,
    image,
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
