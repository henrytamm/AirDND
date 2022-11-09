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
   await queryInterface.bulkInsert('Spots', [{
    ownerId: 1,
    address: "150 Telegraph Ave",
    city: "Berkeley",
    state: "California",
    country: "United States",
    lat: 37.7645358,
    lng: -122.7645358,
    name: "Airbnb Rent Spot 1",
    description: "absolutely terrible place to stay at but it's cheap",
    price: 333
   },
  {
    ownerId: 2,
    address: "1842 Jamestown Rd",
    city: "San Francisco",
    state: "California",
    country: "United States",
    lat: 83.7645358,
    lng: -293.7645358,
    name: "Airbnb Rent Spot 2",
    description: "amazing, fantastic, absolutely fake review",
    price: 999
  }], {})
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
