"use strict";
module.exports = (sequelize, DataTypes) => {
  const tagPost = sequelize.define(
    "tag-post",
    {
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "posts", key: "id" }
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "posts", key: "id" }
      }
    },
    {}
  );
  tagComment.associate = function(models) {
    // associations can be defined here
    models.tagComment.hasOne(models.tag, {
      foreignKey: "tagId",
      targetKey: "id"
    }),
      models.tagComment.hasOne(models.tag, {
        foreignKey: "tagId",
        targetKey: "id"
      });
  };
  return tagPost;
};
