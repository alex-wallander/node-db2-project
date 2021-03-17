// STRETCH
exports.seed = function (knex) {
    return knex('cars').truncate()
      .then(function () {
        return knex('cars').insert([
          { vin: 'JT8BF28G9W5034016', make: 'Ford', model: 'Mustang', mileage: 90325 },
          { vin: '5YFBURHE4EP156069', make: 'Chevy', model: 'Equinox', mileage: 123456 },
        ]);
      });
  };