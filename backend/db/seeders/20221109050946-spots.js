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
   {
    ownerId: 3,
    address: "812 Doctor Dr",
    city: "Los Angelos",
    state: "California",
    country: "United States",
    lat: 83.7645358,
    lng: -293.7645358,
    name: "Airbnb Rent Spot 3",
    description: "fantastic!",
    price: 99,
    previewImage: 'https://www.bhg.com/thmb/H9VV9JNnKl-H1faFXnPlQfNprYw=/1799x0/filters:no_upscale():strip_icc()/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg'
  },
  {
    ownerId: 1,
    address: "109 Durant St",
    city: "Berkeley",
    state: "California",
    country: "United States",
    lat: 83.7645358,
    lng: -293.7645358,
    name: "Airbnb Rent Spot 4",
    description: "nice place but pretty bad neighborhood",
    price: 200,
    previewImage: 'https://res.cloudinary.com/brickandbatten/images/f_auto,q_auto/v1641000863/wordpress_assets/22826-ModContemporary-Accents_w-GauntletGray-a-ok/22826-ModContemporary-Accents_w-GauntletGray-a-ok.jpg?_i=AA'
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
    return queryInterface.bulkDelete(options, null, {})
  }
};
