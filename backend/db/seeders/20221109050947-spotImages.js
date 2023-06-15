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
      url: 'https://www.mydomaine.com/thmb/qfc13qpHnxMkqp8Ja-XwYjC1JQ8=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/SuCasaDesign-Modern-9335be77ca0446c7883c5cf8d974e47c.jpg',
      preview: true,
     },
     {
      spotId: 2,
      url: "https://www.mydomaine.com/thmb/nyzFcv5BeMO125ZWs4xpo3FRbek=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/costanera-1024x610-a747d459be304b8caa70e7f2653348e4.jpg",
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
      options, null, {
        
      }
    )
  }
};
