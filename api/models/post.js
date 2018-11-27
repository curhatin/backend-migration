"use strict";
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define(
    "post",
    {
      accountId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "account", key: "id" }
      },
      tagId: {
        type: DataTypes.INTEGER,
        allowNull: false,
         references: { model: "tag", key: "id" }
      },
      post: { type: DataTypes.TEXT, allowNull: false },
      topic: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  post.associate = function(models) {
    // associations can be defined here

    models.post.belongsTo(models.account, {
      foreignKey: "accountId",
      targetKey: "id"
    })
    models.post.belongsTo(models.tag,{
      foreignKey:"tagId",
      targetKey:"id"
    })
    models.post.hasOne(models["tags-posts"], {
      foreignKey: "postId",
      targetKey: "id"
    })
    models.post.hasMany(models["posts-comments"], {
      foreignKey: "postId",
      targetKey: "id"
    })
  };
  return post;
};
