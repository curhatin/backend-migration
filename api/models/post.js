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

    // models.post.hasOne(models.account, {
    //   foreignKey: "accountId",
    //   targetKey: "id"
    // })
    // models.post.hasOne(models.tag,{
    //   foreignKey:"tagId",
    //   targetKey:"id"
    // })
  };
  return post;
};
