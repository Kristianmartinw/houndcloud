const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const { Breed } = require('../../db/models');
const breedRouter = require('./users');

router.use('/breeds', breedRouter)

//get all breeds
router.get('/', asyncHandler(async (req, rest) => {
    const breeds = await Breed.findAll()
    return rest.json(breeds)
}))

module.exports = router;
