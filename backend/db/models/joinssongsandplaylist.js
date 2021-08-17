'use strict';
module.exports = (sequelize, DataTypes) => {
  const JoinsSongsAndPlaylist = sequelize.define('JoinsSongsAndPlaylist', {
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {});
  JoinsSongsAndPlaylist.associate = function (models) {
    // associations can be defined here
  };
  return JoinsSongsAndPlaylist;
};
