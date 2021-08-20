const express = require('express');
const asyncHandler = require('express-async-handler');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')
const router = express.Router();
const { Comment, User, Song } = require('../../db/models')

// Post /api/users ---Sign up
router.post("/", singleMulterUpload("song"), asyncHandler(async (req, res) => {
    const song = req.file;
    const songUrl = await singlePublicFileUpload(req.file);
    res.json(songUrl)

}));

router.get('/', asyncHandler(async (req, res) => {
    const songs = await Song.findAll({
        include: [{ model: Comment, include: User }, User]
    })
    res.json(songs)
}))

module.exports = router;
