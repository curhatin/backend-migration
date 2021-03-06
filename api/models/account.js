"use strict";
module.exports = (sequelize, DataTypes) => {
  const account = sequelize.define(
    "account",
    {
      fname: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false }
    },
    {}
  );
  account.associate = function(models) {
    // associations can be defined here
    models.account.hasOne(models.post, {
      foreignKey: "accountId",
      targetKey: "id"
    });
    models.account.hasOne(models.comment, {
      foreignKey: "accountId",
      targetKey: "id"
    });


  };
  return account;
};
