'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Playlist.associate = function (models) {
    // associations can be defined here
    Playlist.belongsTo(models.User, { foreignKey: 'userId' })
    const columnMapping = {
      through: 'joinsSongsAndPlaylist',
      foreignKey: 'playlistId',
      otherKey: 'songId',
    };
    Playlist.belongsToMany(models.Song, columnMapping)
  };
  return Playlist;
};
