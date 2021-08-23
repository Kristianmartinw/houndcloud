'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    name: DataTypes.STRING,
    length: DataTypes.INTEGER,
    songUrl: DataTypes.STRING,
    songImg: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    breedId: DataTypes.INTEGER
  }, {});
  Song.associate = function (models) {
    // associations can be defined here
    Song.belongsTo(models.User, { foreignKey: 'userId' })
    Song.belongsTo(models.Breed, { foreignKey: 'id' })
    Song.hasMany(models.Comment, { foreignKey: 'songId' })
    const columnMapping = {
      through: 'joinsSongsAndPlaylist',
      foreignKey: 'songId',
      otherKey: 'playlistId',
    };
    Song.belongsToMany(models.Playlist, columnMapping)
  };
  return Song;
};
