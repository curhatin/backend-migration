"use strict";
module.exports = (sequelize, DataTypes) => {
  const postComment = sequelize.define(
    "posts-comments",
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "posts", key: "id" }
      },
      commentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "comments", key: "id" }
      },
      
    },
    {}
  );
  postComment.associate = function(models) {
    // associations can be defined here
    models["posts-comments"].hasOne(models.post, {
      foreignKey: "postId"
    }),
      models["posts-comments"].hasOne(models.comment, {
        foreignKey: "commentId"
      });
  };
  return postComment;
};
