'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');
const user = require('../models/user');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        fName: 'DeviceMotionEvent',
        lName: 'user',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
      },
      {
        fName: 'faker',
        lName: 'Aphrodite',
        email: faker.internet.email(),
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
      {
        fName: 'Winky',
        lName: 'Ahmad',
        email: faker.internet.email(),
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
