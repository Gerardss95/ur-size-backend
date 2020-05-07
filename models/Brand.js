const mongoose = require('mongoose');

const { Schema } = mongoose;

const brandSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		image: { type: String },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

const Brand = mongoose.model('Brand', brandSchema);

module.exports = Brand;
