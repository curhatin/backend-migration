'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable(
      "tags-comments", "tags-posts"
    )
  },

  down: (queryInterface, Sequelize) => {
    
   
    return queryInterface.renameTable(
      "tags-posts", "tags-comments"
    )
  }
};
