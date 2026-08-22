const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: { type: String, required: true, trim: true },
	description: { type: String, trim: true },
	category: {
		type: String,
		enum: ['accessoire', 'piece', 'service', 'autre'],
		default: 'autre'
	},
	price: { type: Number, required: true, min: 0 },
	stock: { type: Number, required: true, min: 0, default: 0 },
	image: { type: String, trim: true },
	isAvailable: { type: Boolean, default: true }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;