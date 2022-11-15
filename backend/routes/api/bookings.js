const express = require('express');

const { setTokenCookie, requireAuth, restoreUser } = require('../../utils/auth');
const { Spot, User, SpotImage, Review, ReviewImage, Booking, sequelize } = require('../../db/models');
const { check, query } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')
const { DATE } = require('sequelize');
const user = require('../../db/models/user');


const router = express.Router();


router.put('/:bookingId', requireAuth, async (req, res) => {
    const id = req.params.bookingId;
    const userId = req.user.id;
    const currentDate = new Date();
    const { startDate, endDate } = req.body;

    const booking = await Booking.findOne({
        where: {
            id
        },
        include: [
            { model: Spot, attributes: ['ownerId'] }
        ]
    });

    if(!booking){
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404,
        })
    };

    if (endDate < startDate){
        return res.status(400).json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                endDate: "endDate cannot come before startDate"
            }
        })
    };

    if (booking.endDate < currentDate) {
        return res.status(403).json({
            message: "Past bookings can't be modified",
            statusCode: 403
        })
    };

    const overlappingDates = await Booking.findAll({
        where: {
            spotId: id,
            [Op.or]: [
                { startDate: {[Op.between]: [startDate, endDate] }},
                { endDate: {[Op.between]: [startDate, endDate] }}
            ]
        },
    });

    if (overlappingDates.length > 0 || overlappingDates.startDate === startDate){
        // if (overlappingDates){
            return res.status(403).json({
                "message": "Sorry, this spot is already booked for the specified dates",
                "statusCode": 403,
                "errors": {
                    "startDate": "Start date conflicts with an existing booking",
                    "endDate": "End date conflicts with an existing booking"
                }
            })
   
    } else {
       booking.update({
        startDate,
        endDate
       });
       return res.json(booking)
    }

})

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const id = req.params.bookingId;
    const { user } = req;
    const newDate = new Date();
    const booking = await Booking.findOne({
        where: {
            id,
        },
        include: [
            { model: Spot, attributes: ['ownerId'] }
        ]
    });

    if (!booking) {
        return res.status(404).json({
            message: "Booking couldn't be found",
            statusCode: 404,
        })
    }

    if (booking.startDate < newDate) {
        return res.status(403).json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403,
        })
    };

    if (booking.Spot.ownerId === user.id || booking.userId === user.id){
        await booking.destroy();
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