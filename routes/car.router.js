const express = require('express');
const router = express.Router();
const carController = require('../controllers/car.controller');

router.post('/', carController.createCar);
router.get('/', carController.getCars);
router.get('/:id', carController.getCarById);
router.put('/:id', carController.updateCar);
router.delete('/:id', carController.deleteCar);
router.post('/:id/buy', carController.buyCar);
router.post('/:id/sell', carController.sellCar);

module.exports = router;

//crud => create, read, update, delete