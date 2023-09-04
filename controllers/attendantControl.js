// import dependencies
const express = require('express');
require('dotenv').config()
const checkLogin = require('../utils/ensureLoggedIn')
const Trip = require('../models/trip')

const router = express.Router()

// routes
// create
router.post('/:tripId', checkLogin, (req, res) => {
    Trip.findById(req.params.tripId)
        // push the task into the trip tasks array
        // save the trip
        .then(trip => {
            trip.attendants.push(req.body)
            return trip.save()
        })
        // redirect
        .then(trip => {
            res.redirect(`/trips/${trip._id}`)
        })
    // handle errors
        .catch(error => console.error)
})
// edit
router.get('/:id/edit', checkLogin, (req, res) => {
    res.send('attendant edit form')
})
// update
router.patch('/:id', checkLogin, (req, res) => {
    res.send('edit attendant route')
})
// delete
router.delete('/:tripId/:attendantId', checkLogin, (req, res) => {
    // console.log('delete task route')
    // res.send('delete task route')
    Trip.findById(req.params.tripId)
        .then(trip => {
            const theAttendant = trip.attendants.id(req.params.taskId)
            if(req.user.id == trip.owner) {
                theAttendant.deleteOne()
                return trip.save()
            } else {
                res.send('something went wrong')
            }
        })
        .then(trip => {
            res.redirect(`/trips/${trip._id}`)
        })
        .catch(error => console.error)
})

// export
module.exports = router