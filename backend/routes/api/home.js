const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { User } = require('../../db/models');
// const homeRouter = require('./users');

// router.use('/home', homeRouter)

router.get('/', asyncHandler(async (req, res) => {
    const users = await User.findAll()
    return res.json(users)
}))

module.exports = router;
