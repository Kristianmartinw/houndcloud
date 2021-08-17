'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
*/
    return queryInterface.bulkInsert('Breeds', [
      { name: 'Beagle', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Poodle', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Alaskan Malamute', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Golden Labrador', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pug', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chihuahua', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Shiba Inu', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Great Dane', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Basset Hound', createdAt: new Date(), updatedAt: new Date() },
      { name: 'St. Bernard', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pembroke Welsh Corgi', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Chow Chow', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pitbull', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Pekingese', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Breeds', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
