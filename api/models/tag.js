'use strict';
module.exports = (sequelize, DataTypes) => {
  const tag = sequelize.define('tag', {
    tag: {type : DataTypes.STRING, allowNull:false}
  }, {});
  tag.associate = function(models) {
    // associations can be defined here
    models.tag.hasOne(models.post, { foreignKey: 'tagId', targetKey: 'id' })
  };
  return tag;
};