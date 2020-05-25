const mongoose = require('mongoose');

const { Schema } = mongoose;

const reviewSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User' },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    sneaker: { type: Schema.Types.ObjectId, ref: 'Sneaker' },
		review: { type: String },
		userSize: { type: Number },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
