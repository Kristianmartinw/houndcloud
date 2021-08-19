const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const homeRouter = require('./users');

router.use('/home', homeRouter)

module.exports = router;
