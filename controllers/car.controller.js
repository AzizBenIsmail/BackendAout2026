const CarModel = require('../models/car.model');
const UserModel = require('../models/user.model');
const mongoose = require('mongoose');

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

module.exports.buyCar = async (req, res) => {
	try {
		const { userId } = req.body;

		if (!mongoose.isValidObjectId(userId)) {
			return res.status(400).json({ message: 'Valid userId is required' });
		}

		const user = await UserModel.findById(userId);
		if (!user) return res.status(404).json({ message: 'User not found' });

		const car = await CarModel.findOneAndUpdate(
			{ _id: req.params.id, isAvailable: true },
			{
				$set: { owner: user._id, isAvailable: false },  //one
				$addToSet: { owners: user._id } //many
			},
			{ new: true, runValidators: true }
		);

		if (!car) {
			const existingCar = await CarModel.exists({ _id: req.params.id });
			if (!existingCar) return res.status(404).json({ message: 'Car not found' });
			return res.status(409).json({ message: 'Car is not available' });
		}

		await UserModel.findByIdAndUpdate(user._id, {
			$set: { car: car._id }, //one
			$addToSet: { cars: car._id } //many
		});

		res.status(200).json({ message: 'Car purchased successfully', car });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

module.exports.sellCar = async (req, res) => {
	try {
		const { userId } = req.body;

		if (!mongoose.isValidObjectId(userId)) {
			return res.status(400).json({ message: 'Valid userId is required' });
		}

		const car = await CarModel.findById(req.params.id);
		if (!car) return res.status(404).json({ message: 'Car not found' });
		if (!car.owner || car.owner.toString() !== userId) {
			return res.status(403).json({ message: 'Only the owner can sell this car' });
		}

		car.owner = undefined;
		car.isAvailable = true;
		await car.save();

		await UserModel.findByIdAndUpdate(userId, {
			$unset: { car: 1 },
			$pull: { cars: car._id }
		});

		res.status(200).json({ message: 'Car sold successfully', car });
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
};

