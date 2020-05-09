const express = require('express');
const Review = require('../models/Review');
const Sneaker= require('../models/Sneaker');

const router = express.Router();

router.get('/', (req, res, next) => {
	Review.find()
		.then(reviews => {
			return res.status(200).json(reviews);
		})
		.catch(next);
});

router.post('/add', (req, res, next) => {
	const { review, userSize, sneaker } = req.body;
//	const sneaker = req.params;
  const user = req.session.currentUser._id;
	
	Review.create({
    user,
		review,
		sneaker,
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
	const { id } = req.params;
	const { review, userSize } = req.body;
  Review.findByIdAndUpdate(id, {
		review,
		userSize,
	})
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
