const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')
const { DATE } = require('sequelize');
const user = require('../../db/models/user');


const router = express.Router();

//delete review img
router.delete('/:imageId', requireAuth, async (req, res) => {
    const id = req.params.imageId;
    const { user } = req;
    const image = await ReviewImage.findOne({
        where : {
            id
        },
        include: [
            { model: Review, attributes: ['userId'] }
        ]
    })

if (!image) {
    return res.status(404).json({
        message: "Review Image couldn't be found",
        statusCode: 404,
    })
}

if(user.id === image.Review.userId) {
    await image.destroy();
    return res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200,
    })
} else {
    return res.status(403).json({
        message: "Forbidden",
        statusCode: 403
        })
    }
})



module.exports = router;