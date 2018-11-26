"use strict";
module.exports = (sequelize, DataTypes) => {
  const tagComment = sequelize.define(
    "tags-posts",
    {
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "tags", key: "id" }
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
    models["tags-posts"].belongsTo(models.tag, {
      foreignKey: "tagId",
      targetKey: "id"
    })
      models["tags-posts"].belongsTo(models.post, {
        foreignKey: "postId",
        targetKey: "id"
      });
  };
  return tagComment;
};
