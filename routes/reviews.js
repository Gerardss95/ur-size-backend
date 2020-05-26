const express = require('express');
const Review = require('../models/Review');
const Sneaker = require('../models/Sneaker');

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

router.get('/user/:_id', (req, res, next) => {
	const userId = req.params._id;
  Review.find({ user: userId })
  .populate('brand')
  .populate('user')
  .populate('sneaker')
  .then(reviews => {
		res.json(reviews);
	});
});

router.get('/sneaker/:_id', (req, res, next) => {
	const sneakerId = req.params._id;
  Review.find({ sneaker: sneakerId })
  .populate('brand')
  .populate('user')
  .populate('sneaker')
  .then(reviews => {
		res.json(reviews);
	});
});

router.get('/brand/:_id', (req, res, next) => {
	const brandId = req.params._id;
  Review.find({ brand: brandId })
  .populate('brand')
  .populate('user')
  .populate('sneaker')
  .then(reviews => {
		res.json(reviews);
	});
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
	const reviewID = req.params._id;
	console.log(reviewID);
	Review.findById(reviewID)
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
