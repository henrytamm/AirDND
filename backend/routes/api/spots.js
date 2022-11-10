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

module.exports = router;