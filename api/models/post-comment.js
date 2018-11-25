"use strict";
module.exports = (sequelize, DataTypes) => {
  const postComment = sequelize.define(
    "post-comment",
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
    // models.postComment.hasOne(models.post, {
    //   foreignKey: "postId",
    //   targetKey: "id"
    // }),
    //   models.postComment.hasOne(models.comment, {
    //     foreignKey: "commentId",
    //     targetKey: "id"
    //   });
  };
  return postComment;
};
