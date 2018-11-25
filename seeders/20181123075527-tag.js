'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('tags', [{
        tag: 'Education'
      },
      {
        tag: 'Sex'
      },
      {
        tag: 'Social Life'
      },
      {
        tag: 'Religion'
      },
      {
        tag: 'Health'
      },
      {
        tag: 'Others'
      },
    ], {});
   
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
