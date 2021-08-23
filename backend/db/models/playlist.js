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
      through: 'JoinsSongsAndPlaylist',
      foreignKey: 'playlistId',
      otherKey: 'songId',
      onDelete: 'CASCADE',
      hooks: true
    };
    Playlist.belongsToMany(models.Song, columnMapping)
  };
  return Playlist;
};
