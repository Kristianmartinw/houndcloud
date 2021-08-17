'use strict';
module.exports = (sequelize, DataTypes) => {
  const JoinsLike = sequelize.define('JoinsLike', {
    userId: DataTypes.INTEGER,
    songId: DataTypes.INTEGER
  }, {});
  JoinsLike.associate = function (models) {
    // associations can be defined here
  };
  return JoinsLike;
};
