const Cars = require('./cars-model');

const checkCarId = async (req, res, next) => {
  // DO YOUR MAGIC
  const {id} = req.params;
  try {
    const car = await Cars.getById(id);
    if(!car) {
      res.status(404).json({ message:`car with id ${id} is not found` })
    } else {
      req.car = car;
      next();
    }
  } catch (err) {
    next(err)
  }
};

const checkCarPayload = (req, res, next) => {
  // DO YOUR MAGIC
  if(!req.body.vin) {
    res.status(400).json({ message: 'vin is missing'})
  } else if (!req.body.make){
    res.status(400).json({ message: 'make is missing'})
  } else if (!req.body.model){
    res.status(400).json({ message: 'model is missing'})
  } else if (!req.body.mileage){
    res.status(400).json({ message: 'mileage is missing'})
  } else {
    next();
  }
}

const checkVinNumberValid = (req, res, next) => {
  // DO YOUR MAGIC
  var vinValidator = require('vin-validator');
  var isValidVin = vinValidator.validate(req.body.vin);
  if(!isValidVin) {
    res.status(400).json({ message: `vin ${req.body.vin} is invalid`})
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // DO YOUR MAGIC
  try { 
  const car = await Cars.getAll()
  const number = req.body.vin
  const results = car.filter(num => {
    if(num.vin === number) {
      return num;
    }
  })
  if (results.length > 0) {
    return res.status(400).json({ message: `vin ${number} already exists`})
  } else {
    next();
  }
} catch (err) {
  next(err)
}
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique
}