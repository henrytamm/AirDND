'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Bookings', [{
    spotId: 1,
    userId: 1,
    startDate: "2021-11-19 15:00:00",
    endDate: "2021-11-20 15:00:00"
   },
  {
    spotId: 2,
    userId: 2,
    startDate: "2021-5-19 15:00:00",
    endDate: "2021-5-20 15:00:00"
  }])
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
