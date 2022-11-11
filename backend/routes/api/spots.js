const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')


const router = express.Router();


//get all spots
router.get('/', async (req, res) => {
    let spots = await Spot.findAll({
    });

    return res.json(spots)
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
    if (!currentSpot) {
        return res.status(404).json({
        "message": "Spot couldn't be found",
        "statusCode": 404
        });
    }


    return res.json(currentSpot)
})



//create a spot
router.post('/', requireAuth, async (req, res) => {
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
router.post('/:spotId/images', requireAuth, async (req, res, next) => {
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
    return res.json({newImage})
})


//edit a spot
router.put('/:spotId', requireAuth, async (req, res) => {
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