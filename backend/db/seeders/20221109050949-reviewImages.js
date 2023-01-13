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
   options.tableName = "ReviewImages"
   return queryInterface.bulkInsert(options, [
    {
      reviewId: 1,
      url: "https://as2.ftcdn.net/v2/jpg/03/35/34/91/1000_F_335349165_oOkObETuKZhlOKddJRr0uoW7sq84F2gt.jpg"
     },
     {
      reviewId: 2,
      url: "https://paisley-house.com/wp-content/uploads/2021/05/Paisley-House-scaled.jpeg"
     }], {})
    },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = "ReviewImages"
    return queryInterface.bulkDelete(options, null, [{
      
    }])
  }
};
