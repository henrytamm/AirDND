const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')


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
    let spots = await Spot.findAll({
    });

    return res.json(spots)
})

module.exports = router;