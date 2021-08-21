'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
*/
    return queryInterface.bulkInsert('Breeds', [
      {
        name: 'Beagle',
        breedImg: 'https://hound-cloud.s3.us-west-1.amazonaws.com/1629508442007.png'
      },
      {
        name: 'Poodle',
        breedImg: 'https://hound-cloud.s3.us-west-1.amazonaws.com/1629508593029.jpg'
      },
      {
        name: 'Alaskan Malamute',
        breedImg: 'https://hound-cloud.s3.amazonaws.com/1629508398534.jpeg'
      },
      {
        name: 'Golden Labrador',
        breedImg: 'https://hound-cloud.s3.us-west-1.amazonaws.com/1629508499979.jpg'
      },
      {
        name: 'Pug',
        breedImg: 'https://hound-cloud.s3.us-west-1.amazonaws.com/1629508606256.jpg'
      },
      {
        name: 'Chihuahua',
        breedImg: 'https://hound-cloud.s3.us-west-1.amazonaws.com/1629508470476.jpg'
      },
      {
        name: 'Shiba Inu',
        breedImg: 'https://hound-cloud.s3.us-west-1.amazonaws.com/1629508619166.jpg'
      },
      {
        name: 'Great Dane',
        breedImg: 'https://hound-cloud.s3.us-west-1.amazonaws.com/1629508513807.jpg'
      },
      {
        name: 'Basset Hound',
        breedImg: 'https://hound-cloud.s3.us-west-1.amazonaws.com/1629508420440.jpg'
      },
      {
        name: 'St. Bernard',
        breedImg: 'https://hound-cloud.s3.us-west-1.amazonaws.com/1629508632417.jpeg'
      },
      {
        name: 'Pembroke Welsh Corgi',
        breedImg: 'https://hound-cloud.s3.us-west-1.amazonaws.com/1629508563009.jpg'
      },
      {
        name: 'Chow Chow',
        breedImg: 'https://hound-cloud.s3.us-west-1.amazonaws.com/1629508485814.jpg'
      },
      {
        name: 'Pitbull',
        breedImg: 'https://hound-cloud.s3.us-west-1.amazonaws.com/1629508579769.jpg'
      },
      {
        name: 'Pekingese',
        breedImg: 'https://hound-cloud.s3.us-west-1.amazonaws.com/1629508547137.jpg'
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
    return queryInterface.bulkDelete('Breeds', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
