const express = require('express');
const Brand = require('../models/Brand');
//const Shoe = require('../models/Shoe');

const router = express.Router();

router.get('/', (req, res, next) =>{
	Brand.find()
		.then(brands => {
			return res.json(brands);
		})
		.catch(next);
});

router.get('/:_id', (req, res, next) => {
	const brandID = req.params;
	Brand.findById(brandID)
		.then(brand => {
			res.json(brand);
		})
		.catch(next);
});

module.exports = router;
