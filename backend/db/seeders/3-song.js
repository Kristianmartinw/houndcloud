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
        length: 265,
        songUrl: './assets/song.mp3',
        songImg: './assets/image.png',
        userId: 2,
        breedId: 3
      },
      {
        name: 'Undercover meows amongst barks',
        length: 45,
        songUrl: './assets/song2.mp3',
        songImg: './assets/image.png',
        userId: 3,
        breedId: 2
      },
      {
        name: 'Howling into the npm install',
        length: 142,
        songUrl: './assets/song3.mp3',
        songImg: './assets/image.png',
        userId: 1,
        breedId: 2
      },
      {
        name: 'Colorblind',
        length: 219,
        songUrl: './assets/song4.mp3',
        songImg: './assets/image.png',
        userId: 4,
        breedId: 4
      },
      {
        name: 'Wonderwall (barks)',
        length: 87,
        songUrl: './assets/song5.mp3',
        songImg: './assets/image.png',
        userId: 5,
        breedId: 3
      },
      {
        name: 'Ruff Riders',
        length: 103,
        songUrl: './assets/song6.mp3',
        songImg: './assets/image.png',
        userId: 6,
        breedId: 8
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
