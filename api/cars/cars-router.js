// DO YOUR MAGIC
const router = require('express').Router()

const { checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique } = require('./cars-middleware');

const Car = require('./cars-model')

router.get('/', (req, res, next) => {
    Car.getAll()
    .then(cars => {
        res.json(cars)
    })
    .catch(next);
})

router.get('/:id', checkCarId, (req, res, next) => {
    res.json(req.car)
    console.log('---------->', req.car)
    next();
})

router.post('/', checkCarPayload,  checkVinNumberValid, checkVinNumberUnique, (req, res, next) => {
    Car.create(req.body)
    .then(cars => {
        res.status(201).json(cars)
    })
    .catch(next);
})

module.exports = router;