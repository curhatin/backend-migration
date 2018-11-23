'use strict';
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define('tag', {
    tag: {type : DataTypes.STRING, allowNull:false}
  }, {});
  tag.associate = function(models) {
    // associations can be defined here
  };
  return tag;
};