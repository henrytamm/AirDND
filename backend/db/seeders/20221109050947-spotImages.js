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
   options.tableName = "SpotImages";
   return queryInterface.bulkInsert(options, [{
      spotId: 1,
      url: 'https://chatterbox.typepad.com/.a/6a00d8341c86d053ef0154358da177970c-600wi',
      preview: true,
     },
     {
      spotId: 2,
      url: "https://thumbs.dreamstime.com/b/model-house-sale-176363260.jpg",
      preview: true
     }], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "SpotImages";
    return queryInterface.bulkDelete(
      options, {
        
      }
    )
  }
};
