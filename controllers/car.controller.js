const CarModel = require('../models/car.model');

module.exports.createCar = async (req, res) => {
	try {
		const car = await CarModel.create(req.body);
		res.status(201).json(car);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports.getCars = async (req, res) => {
	try {
		const cars = await CarModel.find();
		res.status(200).json(cars);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports.getCarById = async (req, res) => {
	try {
		const car = await CarModel.findById(req.params.id);
		if (!car) return res.status(404).json({ message: 'Car not found' });
		res.status(200).json(car);
	} catch (error) {
		res.status(400).json({ message: 'Invalid car id' });
	}
};

module.exports.updateCar = async (req, res) => {
	try {
		const car = await CarModel.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true
		});
		if (!car) return res.status(404).json({ message: 'Car not found' });
		res.status(200).json(car);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports.deleteCar = async (req, res) => {
	try {
		const car = await CarModel.findByIdAndDelete(req.params.id);
		if (!car) return res.status(404).json({ message: 'Car not found' });
		res.status(200).json({ message: 'Car deleted' });
	} catch (error) {
		res.status(400).json({ message: 'Invalid car id' });
	}
};
