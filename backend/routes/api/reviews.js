const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')


const router = express.Router();

const validateReview = [
    check("review")
      .exists({ checkFalsy: true })
      .withMessage("Review text is required"),
    check("stars")
      .exists({ checkFalsy: true })
      .isInt({ min: 1, max: 5 })
      .withMessage("Stars must be an integer from 1 to 5"),
  
    handleValidationErrors,
  ];

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

//edit review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const reviewId = req.params.reviewId;
    const { review, stars } = req.body;

    const newReview = await Review.findByPk(reviewId);

    if (!newReview) {
        return res.status(404).json({
            "message": "Review couldn't be found",
            "statusCode": 404
        })
    }

    newReview.update({
        review,
        stars
    });
    return res.json(newReview)
})


router.delete('/:reviewId', requireAuth, async (req, res) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;
    const doomedReview = await Review.findByPk(reviewId)

    if (!doomedReview) {
        return res.status(404).json({
            message: "Review couldn't be found",
            statusCode: 404,
        })
    };

    if (doomedReview.userId !== userId) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        });
    }
    doomedReview.destroy();
    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})
module.exports = router;