const mongoose = require('mongoose');

const { Schema } = mongoose;

const sneakerSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		image: [{ type: String, required: true }],
		brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
		info: { type: String },
		userId: { type: Schema.Types.ObjectId, ref: 'User' },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

const Sneaker = mongoose.model('sneaker', sneakerSchema);

module.exports = Sneaker;
