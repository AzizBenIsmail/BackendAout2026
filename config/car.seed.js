const CarModel = require('../models/car.model');

const defaultCars = [
  { brand: 'Renault', model: 'Clio', year: 2022, fuelType: 'essence', transmission: 'manuelle', seats: 5, pricePerDay: 120 },
  { brand: 'Peugeot', model: '208', year: 2023, fuelType: 'essence', transmission: 'manuelle', seats: 5, pricePerDay: 125 },
  { brand: 'Citroen', model: 'C3', year: 2021, fuelType: 'diesel', transmission: 'manuelle', seats: 5, pricePerDay: 110 },
  { brand: 'Volkswagen', model: 'Golf', year: 2022, fuelType: 'diesel', transmission: 'automatique', seats: 5, pricePerDay: 160 },
  { brand: 'Volkswagen', model: 'Polo', year: 2021, fuelType: 'essence', transmission: 'manuelle', seats: 5, pricePerDay: 130 },
  { brand: 'BMW', model: 'Serie 3', year: 2023, fuelType: 'hybride', transmission: 'automatique', seats: 5, pricePerDay: 280 },
  { brand: 'Mercedes-Benz', model: 'Classe C', year: 2022, fuelType: 'diesel', transmission: 'automatique', seats: 5, pricePerDay: 300 },
  { brand: 'Audi', model: 'A3', year: 2023, fuelType: 'essence', transmission: 'automatique', seats: 5, pricePerDay: 240 },
  { brand: 'Fiat', model: '500', year: 2022, fuelType: 'essence', transmission: 'manuelle', seats: 4, pricePerDay: 100 },
  { brand: 'Alfa Romeo', model: 'Giulia', year: 2021, fuelType: 'diesel', transmission: 'automatique', seats: 5, pricePerDay: 220 },
  { brand: 'Volvo', model: 'XC40', year: 2023, fuelType: 'hybride', transmission: 'automatique', seats: 5, pricePerDay: 260 },
  { brand: 'Skoda', model: 'Octavia', year: 2022, fuelType: 'diesel', transmission: 'manuelle', seats: 5, pricePerDay: 150 },
  { brand: 'SEAT', model: 'Leon', year: 2021, fuelType: 'essence', transmission: 'manuelle', seats: 5, pricePerDay: 140 },
  { brand: 'Dacia', model: 'Duster', year: 2023, fuelType: 'essence', transmission: 'manuelle', seats: 5, pricePerDay: 135 },
  { brand: 'Opel', model: 'Corsa', year: 2022, fuelType: 'electrique', transmission: 'automatique', seats: 5, pricePerDay: 145 },
  { brand: 'Mini', model: 'Cooper', year: 2021, fuelType: 'essence', transmission: 'automatique', seats: 4, pricePerDay: 170 },
  { brand: 'Jaguar', model: 'XE', year: 2020, fuelType: 'diesel', transmission: 'automatique', seats: 5, pricePerDay: 260 },
  { brand: 'Land Rover', model: 'Evoque', year: 2022, fuelType: 'hybride', transmission: 'automatique', seats: 5, pricePerDay: 320 },
  { brand: 'Porsche', model: 'Macan', year: 2021, fuelType: 'essence', transmission: 'automatique', seats: 5, pricePerDay: 450 },
  { brand: 'Ferrari', model: 'Roma', year: 2022, fuelType: 'essence', transmission: 'automatique', seats: 2, pricePerDay: 900 }
];

module.exports.seedDefaultCars = async () => {
  for (const carData of defaultCars) {
    await CarModel.updateOne(
      { brand: carData.brand, model: carData.model, year: carData.year },
      { $setOnInsert: carData },
      { upsert: true }
    );
  }

  console.log('Voitures europeennes par défaut vérifiées');
};
