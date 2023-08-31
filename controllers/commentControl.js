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
router.delete('/:tripId/:commentId', checkLogin, (req, res) => {
    // res.send('delete comment route')
    const tId = req.params.tripId
    const cId = req.params.commentId
    Trip.findById(tId)
        .then(trip => {
            const theComment = trip.comments.id(cId)
            if(req.user.id == theComment.author) {
                theComment.deleteOne()
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