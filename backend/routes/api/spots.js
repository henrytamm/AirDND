const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')


const router = express.Router();


//get all spots
router.get('/', async (req, res) => {
    let spots = await Spot.findAll({
    });

    res.json(spots)
})


//get all spots owned from curr user
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const currentSpot = await Spot.findAll({
        where: {
            ownerId: user.id
        }
    });
    return res.json(currentSpot)
});


//create a spot
router.post('/', requireAuth, async (req, res, next) => {
    const { id } = req.user
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const user = await User.findByPk(id)
    const newSpot = await Spot.create({
        ownerId: user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    });

    res.json(newSpot)
})

//add an image to a spot based on spotid (imageableId and imageableType? had to change postman because i don't have a previewImage?)
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
    const userId = req.user.id;
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        return res.status(404).json({
            message: "Could not find spot",
            statusCode: 404,
        })
    }

    const newImage = await SpotImage.create({
        spotId,
        userId,
        url: req.body.url,
        preview: req.body.preview
    });
    const { id, url, preview } = newImage;
    res.json({newImage})
})

module.exports = router;