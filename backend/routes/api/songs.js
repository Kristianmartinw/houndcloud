const express = require('express');
const asyncHandler = require('express-async-handler');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')
const router = express.Router();
const { Comment, User, Song, Playlist } = require('../../db/models')


router.post("/upload", singleMulterUpload("song"), asyncHandler(async (req, res) => {
    const song = req.file;
    const songUrl = await singlePublicFileUpload(req.file);
    res.json(songUrl)
}));

router.post("/", asyncHandler(async (req, res) => {
    await Song.create(req.body)
    const songs = await Song.findAll({
        include: [{ model: Comment, include: User }, User]
    })
    res.json(songs)
}));

router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll({
        include: [{ model: Comment, include: User }, User]
    })
    res.json(songs)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const song = await Song.findByPk(+req.params.id);
    song.destroy();
    const users = await User.findAll({ include: [Song, { model: Playlist, include: Song }] })
    res.json(users);
}))

module.exports = router;
