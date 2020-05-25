const express = require('express');
const Review = require('../models/Review');
const Brand = require('../models/Brand');

const router = express.Router();

router.get('/', (req, res, next) => {
	Review.find()
		.populate('brand')
    .populate('user')
    .populate('sneaker')
		.then(reviews => {
			return res.status(200).json(reviews);
		})
		.catch(next);
});

router.post('/', (req, res, next) => {
	const { sneaker, review, userSize, brand, user } = req.body;
	//	const sneaker = req.params;

	Review.create({
		user,
    review,
    sneaker,
		brand,
		userSize,
	})
		.then(newReview => {
			res.status(201).json(newReview);
		})
		.catch(next);
});

router.get('/:_id', (req, res, next) => {
	const { id } = req.params;
	Review.findById(id)
		.then(review => {
			res.json(review);
		})
		.catch(next);
});

router.delete('/:_id', (req, res, next) => {
	const { id } = req.params;
	Review.findByIdAndDelete(id)
		.then(review => {
			res.json(review);
		})
		.catch(next);
});

router.put('/:_id', (req, res, next) => {
	const { id } = req.params._id;
	const { sneaker, review, userSize, brand } = req.body;
	Review.findByIdAndUpdate(
		id,
		{
      sneaker,
			review,
			userSize,
			brand,
		},
		{ new: true }
	)
		.then(reviewUpdated => {
			if (reviewUpdated) {
				res.json(reviewUpdated);
			} else {
				res.status(404).json('not found');
			}
		})
		.catch(next);
});

module.exports = router;
