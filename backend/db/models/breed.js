'use strict';
module.exports = (sequelize, DataTypes) => {
  const Breed = sequelize.define('Breed', {
    name: DataTypes.STRING,
    breedImg: DataTypes.STRING
  }, {});
  Breed.associate = function (models) {
    // associations can be defined here
    Breed.hasMany(models.Song, { foreignKey: 'breedId', onDelete: 'CASCADE', hooks: true })
  };
  return Breed;
};
