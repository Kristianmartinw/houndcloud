const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Breed, Song, Playlist, User, Comment } = require('../../db/models');


const validateComment = [
    check('comment')
        .exists({ checkFalsy: true })
        .isLength({ max: 1000 })
        .withMessage('Please provide a comment with less than 1000 characters.'),
    handleValidationErrors,
];

router.post('/', validateComment, asyncHandler(async (req, res) => {
    await Comment.create(req.body)
    const song = await Song.findAll({
        include: [{ model: Comment, include: User }]
    })
    return res.json(song)
}))

router.delete('/:id', asyncHandler(async (req, res) => {
    const comment = await Comment.findByPk(+req.params.id);
    const songId = comment.songId
    comment.destroy();
    const song = await Song.findByPk(songId, {
        include: [{ model: Comment, include: User }, User]
    })
    res.json(song);
}))

module.exports = router;
