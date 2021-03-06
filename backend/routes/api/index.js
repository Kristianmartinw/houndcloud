const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const breedsRouter = require('./breeds.js');
const homeRouter = require('./home.js');
const songsRouter = require('./songs.js')
const commentsRouter = require('./comments.js')
const playlistsRouter = require('./playlists.js')
const asyncHandler = require('express-async-handler');
const { setTokenCookie } = require('../../utils/auth.js');
const { User } = require('../../db/models');
const { restoreUser } = require('../../utils/auth.js');
const { requireAuth } = require('../../utils/auth.js');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/breeds', breedsRouter);
router.use('/songs', songsRouter);
router.use('/home', homeRouter);
router.use('/playlists', playlistsRouter);
router.use('/comments', commentsRouter);

// GET /api/set-token-cookie
router.get('/set-token-cookie', asyncHandler(async (req, res) => {
    const user = await User.findOne({
        where: {
            username: 'Demo-lition'
        },
    })
    setTokenCookie(res, user);
    return res.json({ user });
}));

// GET /api/restore-user
router.get('/restore-user', restoreUser, (req, res) => {
    return res.json(req.user);
}
);

// GET /api/require-auth
router.get('/require-auth', requireAuth, (req, res) => {
    return res.json(req.user);
}
);

router.post('/test', function (req, res) {
    res.json({ requestBody: req.body });
});




module.exports = router;
