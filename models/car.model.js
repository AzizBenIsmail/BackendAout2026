const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
	brand: { type: String, required: true, trim: true },
	model: { type: String, required: true, trim: true },
	year: {
		type: Number,
		required: true,
		min: 2018,
		max: new Date().getFullYear() + 1
	},
	fuelType: {
		type: String,
		enum: ['essence', 'diesel', 'hybride', 'electrique'],
		required: true
	},
	transmission: {
		type: String,
		enum: ['manuelle', 'automatique'],
		default: 'manuelle'
	},
	seats: { type: Number, required: true, min: 1, max: 5 },
	pricePerDay: { type: Number, required: true, min: 0 },
	isAvailable: { type: Boolean, default: true },

    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  //One

    owners: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]  //Many

}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);

module.exports = Car;
