const mongoose = require('mongoose');

const { Schema } = mongoose;

const shoeSchema = new Schema(
	{
		name: { type: String, required: true, unique: true },
		image: [{ type: String, required: true }],
		brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
		info: { type: String },
	},
	{
		timestamps: {
			createdAt: 'created_at',
			updatedAt: 'updated_at',
		},
	}
);

const Shoe = mongoose.model('Shoe', shoeSchema);

module.exports = Shoe;
