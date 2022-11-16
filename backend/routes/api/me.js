const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')
const { DATE } = require('sequelize')

const router = express.Router();


const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];

//get current user
router.get('/', restoreUser, async (req, res) => {
    const { user } = req;

    user.dataValues.token = await setTokenCookie(res, user)

    if(user) {
      return res.json(user.dataValues)
    } else {
      return res.json({})
    }
})


//get all spots
router.get('/spots', async (req, res) => {
    let { page, size } = req.query;
    page = parseInt(page);
    size = parseInt(size);
    if (!page) page = 1;
    if (!size) size = 10;
    let limit;
    let offset;

    if (page === 0) {
        page = null;
        size = null;
    } else if (page > 10) {
        page = 10;
    } else if (size > 20) {
        size = 20
    } else {
        limit = size;
        offset = size * (page - 1)
    }

    let spots = await Spot.findAll({
    });

    return res.json({
        spots,
        page: page,
        size: size
    })
})


//get all reviews of the current user
router.get('/reviews', requireAuth, async (req, res) => {
    const userId = req.user.id;

    const reviews = await Review.findAll({
        where: {
            userId: userId
        },

        include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
            { model: Spot, attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price" ] },
            { model: ReviewImage, attributes: ["id", "url"] }

        ]
    });
    return res.json(reviews)
})

//get all bookings from current user
router.get('/bookings', requireAuth, async (req, res) => {
    const { user } = req;
    const currentBookings = await Booking.findAll({
        where: {
            userId: user.id
        },
        include: [
            { model: Spot, attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'], 
        include: { model: SpotImage, attributes: ['url'] }
            }
        ]
    });

    return res.json({Bookings: currentBookings})
})


module.exports = router;