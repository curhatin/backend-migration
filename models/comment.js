"use strict";
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
    {
      comments: { type: DataTypes.TEXT, allowNull: false }
    },
    {}
  );
  comment.associate = function(models) {
    // associations can be defined here
  };
  return comment;
};
