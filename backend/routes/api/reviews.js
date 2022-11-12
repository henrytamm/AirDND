const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')


const router = express.Router();

//add image to review based on review id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const userId = req.user.id;
    const reviewId = req.params.reviewId;

    const errorReview = await Review.findByPk(reviewId)
    if(!errorReview){
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    const totalImages = await ReviewImage.findAll({})
    if (totalImages.length > 10) {
        return res.status(403).json({
            "message": "Maximum number of images for this resource was reached",
            "statusCode": 403
        })
    }

    const newImage = await ReviewImage.create({
        reviewId: reviewId,
        url: req.body.url
    });
    const { id, url } = newImage
    return res.json({ id, url })
})

module.exports = router;