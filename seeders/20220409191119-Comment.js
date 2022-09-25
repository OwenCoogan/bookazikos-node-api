'use strict';
const { User } = require('../models');
module.exports = {
  async up (queryInterface, Sequelize) {

    const author = await User.findOne();
    await queryInterface.bulkInsert('Comments', [{
      userId: author.id,
      postId: 2,
      comment:
        "Nulla mollis molestie lorem. Quisque ut erat. Curabitur gravida nisi at nibh.",
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
