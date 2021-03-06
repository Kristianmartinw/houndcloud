const express = require('express');
const asyncHandler = require('express-async-handler');
const { singleMulterUpload, singlePublicFileUpload } = require('../../awsS3')

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Playlist, Song, User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router();

const validateSignup = [
    check('fName')
        .exists({ checkFalsy: true })
        .isLength({ max: 30 })
        .withMessage('Please provide a name with less than 30 characters.'),
    check('lName')
        .exists({ checkFalsy: true })
        .isLength({ max: 30 })
        .withMessage('Please provide a name with less than 30 characters.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    // check('profilePic')
    //     .exists({ checkFalsy: true })
    //     .withMessage("Provide a profile picture or you'll be assigned a generic one."),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors,
];

// Sign up
router.post('/', validateSignup, asyncHandler(async (req, res) => {
    const { fName, lName, username, email, profilePic, password, } = req.body;
    const user = await User.signup({ fName, lName, username, email, profilePic, password });

    await setTokenCookie(res, user);

    return res.json({
        user,
    });
}),
);


router.get('/', asyncHandler(async (req, res) => {
    const users = await User.findAll({
        include: [Song, { model: Playlist, include: Song }]
    });
    return res.json(users)
}));

module.exports = router;
