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
    return queryInterface.bulkInsert('Songs', [
      {
        name: 'Barking at League',
        songUrl: './assets/song.mp3',
        songImg: './assets/image.png',
        userId: 2,
        breedId: 7
      },
      {
        name: 'Undercover meows amongst barks',
        songUrl: './assets/song.mp3',
        songImg: './assets/image.png',
        userId: 3,
        breedId: 2
      },
      {
        name: 'Howling into the npm install',
        songUrl: './assets/song.mp3',
        songImg: './assets/image.png',
        userId: 1,
        breedId: 2
      },
      {
        name: 'Colorblind',
        songUrl: './assets/song.mp3',
        songImg: './assets/image.png',
        userId: 4,
        breedId: 4
      },
      {
        name: 'Wonderwall (barks)',
        songUrl: './assets/song.mp3',
        songImg: './assets/image.png',
        userId: 5,
        breedId: 3
      },
      {
        name: 'Ruff Riders',
        songUrl: './assets/song.mp3',
        songImg: './assets/image.png',
        userId: 6,
        breedId: 14
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Songs', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
