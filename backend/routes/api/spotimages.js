const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')
const { DATE } = require('sequelize');
const user = require('../../db/models/user');


const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const id = req.params.imageId;
    const userId = req.user.id;
    const doomedImage = await SpotImage.findOne({
        where : {
            id
        },
        include: [
            { model: Spot, attributes: ['ownerId']}
        ]
    });

    if (!doomedImage) {
        return res.status(404).json({
            message: "Spot Image couldn't be found",
            statusCode: 404,
        })
    };

    if (userId === image.Spot.ownerId){
        doomedImage.destroy();
        return res.json({
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