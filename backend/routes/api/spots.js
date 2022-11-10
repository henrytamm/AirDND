const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


//get all spots
router.get('/', async (req, res) => {
    let spots = await Spot.findAll({
    });

    res.json(spots)
})

module.exports = router;