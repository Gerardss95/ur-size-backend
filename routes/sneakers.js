const express = require('express');
// const Brand = require('../models/Brand');
const Sneaker = require('../models/Sneaker');

const router = express.Router();

router.get('/', (req, res, next) => {
	Sneaker.find()
		.populate('brand')
		.then(sneaker => {
			return res.status(200).json(sneaker);
		})
		.catch(next);
});

router.post('/', (req, res, next) => {
	const { name, brand, info, image, userId } = req.body;
	Sneaker.create({
		name,
		brand,
		info,
		image,
		userId,
	})
		.then(newSneaker => {
			res.status(201).json(newSneaker);
		})
		.catch(next);
});

router.get('/:_id', (req, res, next) => {
	const sneakerID = req.params;
  Sneaker.findById(sneakerID)
  .populate('brand')
		.then(sneaker => {
			res.json(sneaker);
		})
		.catch(next);
});

router.delete('/:_id', (req, res, next) => {
	const sneakerID = req.params;

	Sneaker.findByIdAndDelete(sneakerID)
		.then(sneaker => {
			res.json(sneaker);
		})
		.catch(next);
});

router.put('/:_id', (req, res, next) => {
	const { name, brand, info, image } = req.body;
	Sneaker.findByIdAndUpdate(
		req.params._id,
		{
			name,
			brand,
			info,
			image,
		},
		{ new: true }
	)
		.then(sneakerUpdated => {
			if (sneakerUpdated) {
				res.json(sneakerUpdated);
			} else {
				res.status(404).json('not found');
			}
		})
		.catch(next);
});

module.exports = router;
