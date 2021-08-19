'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Playlists', [
      {
        name: 'Jams to shoulder vibe to',
        userId: 3
      },
      {
        name: 'Crying in the bathtub',
        userId: 4
      },
      {
        name: 'Pigs',
        userId: 5
      },
      {
        name: 'Hard work and determination',
        userId: 2
      },
      {
        name: 'Binary code to dominate the world',
        userId: 1
      },
      {
        name: 'Anime and Kpop',
        userId: 6
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Playlists', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
