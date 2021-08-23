const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Breed, Song, Playlist, User, JoinsSongsAndPlaylist } = require('../../db/models');


const validatePlaylist = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 30 })
        .withMessage('Please provide a name with less than 30 characters.'),
    handleValidationErrors,
];

router.post('/', validatePlaylist, asyncHandler(async (req, res) => {
    const playlist = await Playlist.create(req.body)
    const user = await User.findByPk(playlist.userId, { include: [Song, Playlist] })
    return res.json(user)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const playlist = await Playlist.findByPk(+req.params.id);
    playlist.destroy();
    const users = await User.findAll({ include: [Song, Playlist] })
    res.json(users);
}))

router.post('/addSong', asyncHandler(async (req, res) => {
    await JoinsSongsAndPlaylist.create(req.body);
    const playlists = await User.findAll({
        include: [Song, Playlist]
    });
    return res.json(playlists);
}))

router.delete('/:playlistId/:songId', asyncHandler(async (req, res) => {
    const playlistId = +req.params.playlistId;
    const songId = +req.params.songId;
    const join = await SJoinsSongsAndPlaylist.findOne({
        where: {
            playlistId,
            songId
        }
    });
    join.destroy();
    const playlists = await User.findAll({
        include: [Song, Playlist]
    });
    return res.json(playlists);
}))

module.exports = router;
