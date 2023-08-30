// import dependencies
const express = require('express');
require('dotenv').config()
const checkLogin = require('../utils/ensureLoggedIn')

const Trip = require('../models/trip')

const router = express.Router()

// routes
// index
router.get('/', (req, res) => {
    Trip.find({})
        .then(trips => {
            // console.log('found the trips', trips)
            // res.json(trips)
            res.render('trips/index', { title: 'My Trips', trips})
        })
        .catch(err => console.log.error)
})
// new
router.get('/new', checkLogin, (req, res) => {
    res.render('trips/new', { title: 'Create A New Trip' })
})
// create
router.post('/', checkLogin, (req, res) => {
    // assign owner
    
    req.body.owner = req.user.id
    console.log(req.body.owner, req.user.id)
    Trip.create(req.body)
        .then(trip => {
            res.redirect(`trips/${trip.id}`)
        })
        .catch(err => {
            console.log(err)
            res.redirect('/trips/new')
        })
})
// edit
router.get('/:id/edit', checkLogin, (req, res) => {
    Trip.findById(req.params.id)
        .then(trip => {
            console.log('found this trip', trip)
            // trip.tripStartDate.format("YYYY-MM-DD")
            // trip.tripEndDate.format("YYYY-MM-DD")
            res.render('trips/edit', {trip, title: `Edit Trip: ${trip.tripName}`})
        })
        .catch(err => console.log.error)
})
// update
router.patch('/:id', checkLogin, (req, res) => {
    Trip.findById(req.params.id)
        .then(trip => {
            if(trip.owner == req.user.id) {
                return trip.updateOne(req.body)
            } else {
                res.send('something went wrong')
            }
        })
        .then(data => {
            console.log('what is updated', data)
            res.redirect(`/trips`)
        })
        .catch(err => console.log.error)
})
// delete
router.delete('/:id', checkLogin, (req, res) => {
    Trip.findById(req.params.id)
        .then(trip => {
            if(trip.owner == req.user.id) {
                return trip.deleteOne()
            } else {
                res.send('something went wrong')
            }
        })
        .then(data => {
            // console.log('returned from deleteOne', data)
            res.redirect('/trips')
        })
        .catch(err => console.log.error)
})
// show
router.get('/:id', (req, res) => {
    Trip.findById(req.params.id)
        .populate('owner')
        // .populate('author')
        .then(trip => {
            console.log('found this trip', trip.comments)
            res.render('trips/show', { title: trip.tripName, trip})
        })
        .catch(err => console.log.error)
})

// export
module.exports = router