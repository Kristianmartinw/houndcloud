const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Breed, Song, User } = require('../../db/models');
const breedRouter = require('./users');

router.use('/breeds', breedRouter)

//get all breeds
router.get('/', asyncHandler(async (req, res) => {
    const breeds = await Breed.findAll({
        include: [{ model: Song, include: User }]
    })
    return res.json(breeds)
}))

module.exports = router;
