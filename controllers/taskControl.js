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
            trip.tasks.push(req.body)
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
    res.send('task edit form')
})
// update
router.patch('/:id', checkLogin, (req, res) => {
    res.send('edit task route')
})
// delete
router.delete('/:id', checkLogin, (req, res) => {
    res.send('delete task route')
})

// export
module.exports = router