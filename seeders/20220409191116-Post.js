'use strict';
const { User } = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    const author = await User.findOne();
    await queryInterface.bulkInsert('Posts', [{
      userId: author.id,
      title: 'some dummy title',
      content:
        "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat.",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      userId: author.id,
      title: "This is a new post at the eiffel tower, it should come within range of the geolocated posts query",
      content: "owen@test.com",
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      userId: author.id,
      title: "This is a new post at the eiffel tower, it should come within range of the geolocated posts query",
      content: "owen@test.com",
      createdAt: new Date(),
      updatedAt: new Date()
     }], {});
 },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
