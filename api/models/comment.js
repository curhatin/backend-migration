"use strict";
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define(
    "comment",
    {
      comments: { type: DataTypes.TEXT, allowNull: false },
    
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "posts", key: "id" }
      },
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "account", key: "id" }
      },
    },

    {}
  );
  comment.associate = function(models) {
    // associations can be defined here
    models.comment.hasOne(models["posts-comments"], {
      foreignKey: "commentId",
      targetKey: "id"
  })
  models.comment.belongsTo(models.post, {
    foreignKey: "postId"
  })
  models.comment.belongsTo(models.account, {
    foreignKey: "accountId"
  })
}
  return comment;
};
