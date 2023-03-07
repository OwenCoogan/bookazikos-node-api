'use strict';
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const Users = [{
  id:uuidv4(),
  firstName: 'Jessica',
  lastName: 'Narvaez',
  email: 'jnarvaezg@outlook.com',
  role: 'admin',
  password: await bcrypt.hash('hello', 10),
  createdAt: new Date(),
  updatedAt: new Date(),
},
{
  id:uuidv4(),
  firstName: 'Owen',
  lastName: 'Coogan',
  email: 'owencoogan01@gmail.com',
  role: 'super-admin',
  password: await bcrypt.hash('hello', 10),
  createdAt: new Date(),
  updatedAt: new Date(),
}
]



module.exports = {

  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', Users, {});
  },

  async down (queryInterface, Sequelize) {
  }
};
