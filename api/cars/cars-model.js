const knex = require('../../data/db-config.js');

const getAll = () => {
  // DO YOUR MAGIC
  return knex('cars')
}

const getById = (id) => {
  // DO YOUR MAGIC
  return knex('cars').where('id', id).first()
}

const create = (car) => {
  // DO YOUR MAGIC
  if (car) {
    return knex('cars').insert(car)
    .then(([id]) => {
      return getById(id)
    }
    )}
}

module.exports = {
  getAll,
  getById,
  create
}