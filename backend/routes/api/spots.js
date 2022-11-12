const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize');
const user = require('../../db/models/user');


const router = express.Router();

const validateSpot = [
    check('address')
    .exists({ checkFalsy: true })
    .withMessage('Street address is required'),
    check('city')
    .exists({ checkFalsy: true })
    .withMessage('City is required'),
    check('state')
    .exists({ checkFalsy: true })
    .withMessage('State is required'),
    check('country')
    .exists({ checkFalsy: true })
    .withMessage('Country is required'),
    check('lat')
    .exists({ checkFalsy: true })
    .isNumeric({ checkFalsy: true })
    .withMessage('Latitude is not valid'),
  check('lng')
    .exists({ checkFalsy: true })
    .isNumeric({ checkFalsy: true })
    .withMessage('Longitude is not valid'),
  check("name")
    .exists({ checkFalsy: true })
    .isLength({ max: 51 })
    .withMessage("Name must be less than 50 characters"),
  check("description")
    .exists({ checkFalsy: true })
    .withMessage("Description is required"),
  check("price")
    .exists({ checkFalsy: true })
    .isInt({ checkFalsy: true })
    .withMessage("Price per day is required"),

  handleValidationErrors,
];

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



//get all spots owned from curr user
router.get('/current', requireAuth, async (req, res) => {
    const { user } = req;

    const currentSpot = await Spot.findAll({
        where: {
            ownerId: user.id
        },
        attributes : {
            include: [
                    [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating'],
                    [sequelize.col('SpotImages.url'), 'previewImage']
            ]
        },
        include: [
            { model: SpotImage, attributes: []},
            { model: Review, attributes: []}
        ]
    });
    
    return res.json(currentSpot)
});

//get details of a spot from an id
router.get('/:spotId', async (req, res) => {
    const id = req.params.spotId;
    const currentSpot = await Spot.findByPk(id, {
        attributes: {
            include: [
                [
                sequelize.fn('COUNT', sequelize.col('Reviews.review')),
                'numReviews'
                ],
                [ 
                sequelize.fn('AVG', sequelize.col('Reviews.stars')),
                'avgStarRating'
                ]
            ],
        },
        include: [
            { model: SpotImage, attributes: ['id', 'url', 'preview']},
            { model: Review, attributes: []},
            { model: User, as: "Owner", attributes: ['id', 'firstName', 'lastName']}
        ]
    });

    const errorSpot = await Spot.findByPk(id);
    if(!errorSpot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    return res.json(currentSpot)
})



//create a spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
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

    return res.json(newSpot)
})

//add an image to a spot based on spotid (imageableId and imageableType? had to change postman because i don't have a previewImage?)
router.post('/:spotId/images', requireAuth, async (req, res) => {
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
        url: req.body.url,
        preview: req.body.preview
    });
    const { id, url, preview } = newImage
    return res.json({id, url, preview})
})


//edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const spotId = req.params.spotId;
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spot = await Spot.findByPk(spotId, {

    });

    if (!spot) {
        return res.status(404).json({
                "message": "Spot couldn't be found",
                "statusCode": 404
        })
    }

    spot.update({ address, city, state, country, lat, lng, name, description, price })

    return res.json(spot)
});



//create a review for a spot based on the spot's id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;
    const { stars, review } = req.body;

    const spot = await Spot.findOne({
        where : {
            id: spotId
        }
     })

    if (!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
         })
    }

    const dupeReview = await Review.findOne({
        where: {
            userId, spotId
        }
    })

    if(dupeReview) {
        return res.status(403).json({
            "message": "User already has a review for this spot",
            "statusCode": 403
        })
    }

    const newReview = await Review.create({
        userId,
        spotId: spotId,
        stars,
        review
    })
    return res.json(newReview)
})


//get all reviews by spot id
router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;

    const spot = await Spot.findOne({
        where: {
            id: spotId
        }
    })

    if(!spot) {
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }

    const reviews = await Review.findAll({
        where: {
            spotId 
        },
        include: [
            { model: User, attributes: ['id', 'firstName', 'lastName'] },
            { model: ReviewImage, attributes: ['id', 'url']}
        ]
    });

    res.json(reviews)
});


//create booking from spot based on spotid
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const id = req.params.spotId;
    const { startDate, endDate } = req.body;
    const { user } = req;
    const spotId = req.params.spotId

    const spot = await Spot.findByPk(id, {
        include: [
            { model: Booking }
        ]
    });
    if (!spot) {
        return res.status(404).json({
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    if (user.id === spot.ownerId) {
        return res.status(403).json({
            message: "Forbidden",
            statusCode: 403
        })
    }

    const overlappingDates = await Booking.findAll({
        where: {
            spotId: id
        }
    });
    if (overlappingDates.length > 0 || overlappingDates.startDate === startDate){
        return res.status(403).json({
            "message": "Sorry, this spot is already booked for the specified dates",
            "statusCode": 403,
            "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        })
    }
    if (endDate < startDate) {
        return res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot be on or before startDate"
            }
        })

    } else {

    const newBooking = await Booking.create({
        spotId: spotId,
        userId: user.id,
        startDate,
        endDate
    });
    return res.json(newBooking)
    }
})



//delate a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = req.params.spotId;
    const doomedSpot = await Spot.findByPk(spotId)

    if (!doomedSpot){
        return res.status(404).json({
            "message": "Spot couldn't be found",
            "statusCode": 404
        })
    }
    await doomedSpot.destroy();
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })
})
module.exports = router;