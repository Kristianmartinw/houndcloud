'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');
const user = require('../models/user');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fName: 'DeviceMotionEvent',
        lName: 'Bruiser',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        fName: 'Faker',
        lName: 'Aphrodite',
        email: faker.internet.email(),
        username: 'fakethisname',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        fName: 'Winky',
        lName: 'Ahmad',
        email: faker.internet.email(),
        username: 'wemissyou',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        fName: 'Ivy',
        lName: 'Huynh',
        email: faker.internet.email(),
        username: 'sexiibaybee420',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        fName: 'Zane',
        lName: 'Hamad',
        email: faker.internet.email(),
        username: 'callmev',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        fName: 'Bean',
        lName: 'Kirara',
        email: faker.internet.email(),
        username: 'Keipara',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', null, { truncate: true, cascade: true, restartIdentity: true });
  }
};
