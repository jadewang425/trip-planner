// import dependencies
const express = require('express');
require('dotenv').config()
const checkLogin = require('../utils/ensureLoggedIn')
const Trip = require('../models/trip')

const router = express.Router()

// routes
// create
router.post('/:tripId', checkLogin, (req, res) => {
    req.body.author = req.user._id
    console.log('req.body', req.body)
    // res.send('post a comment')
    // find trip
    Trip.findById(req.params.tripId)
        // push the comment into the trip comments array
        // save the trip
        .then(trip => {
            trip.comments.push(req.body)
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
    res.send('comment edit form')
})
// update
router.patch('/:id', checkLogin, (req, res) => {
    res.send('edit comment route')
})
// delete
router.delete('/:id', checkLogin, (req, res) => {
    res.send('delete comment route')
})

// export
module.exports = router