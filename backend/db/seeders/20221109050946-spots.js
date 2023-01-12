'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
   options.tableName = "Spots"
   return queryInterface.bulkInsert(options, [
    {
     ownerId: 1,
     address: "150 Telegraph Ave",
     city: "Berkeley",
     state: "California",
     country: "United States",
     lat: 37.7645358,
     lng: -122.7645358,
     name: "Airbnb Rent Spot 1",
     description: "absolutely terrible place to stay at but it's cheap",
     price: 333,
     previewImage: 'https://chatterbox.typepad.com/.a/6a00d8341c86d053ef0154358da177970c-600wi'
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
     price: 999,
     previewImage: 'https://thumbs.dreamstime.com/b/model-house-sale-176363260.jpg'
   },
  ]);  
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "Spots"
    return queryInterface.bulkDelete(options, {
      
    })
  }
};
