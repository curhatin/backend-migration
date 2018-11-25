'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('accounts', [{
        fname: 'Wippy Zulkarnain',
        email: 'wippy@gmail.com',
        password: 'wippy'
      },
      {
        fname: 'Albert Monmon',
        email: 'albert@gmail.com',
        password: 'albert'
      },
      {
        fname: 'Muhsin Sutanton',
        email: 'muhsin@gmail.com',
        password: 'muhsin'
      },
    ], {});
    
   
  },

  down: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkDelete('accounts', null, {});
  
  }
};
