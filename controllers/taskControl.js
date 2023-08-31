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
router.delete('/:tripId/:taskId', checkLogin, (req, res) => {
    // console.log('delete task route')
    // res.send('delete task route')
    Trip.findById(req.params.tripId)
        .then(trip => {
            const theTask = trip.tasks.id(req.params.taskId)
            if(req.user.id == trip.owner) {
                theTask.deleteOne()
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