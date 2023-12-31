// import dependencies
const express = require('express');
require('dotenv').config()
const checkLogin = require('../utils/ensureLoggedIn')

const Trip = require('../models/trip')

const router = express.Router()

// routes
// index
router.get('/', (req, res) => {
    Trip.find({owner: req.user.id}).sort('tripStartDate')
        .then(trips => {
            const today = new Date()
            const pastTrips = trips.filter(trip => {
                return trip.tripStartDate && trip.tripEndDate < today
            })
            const upcomingTrips = trips.filter(trip => {
                return !pastTrips.includes(trip)
            })
            res.render('trips/index', { title: 'My Trips', pastTrips, upcomingTrips})
        })
        .catch(err => console.log.error)
})
// new
router.get('/new', checkLogin, (req, res) => {
    res.render('trips/new', { title: 'Create A New Trip' })
})
// create
router.post('/', checkLogin, (req, res) => {
    req.body.owner = req.user.id
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
            function date(d) {
                const year = d.getFullYear()
                const month = d.getMonth() + 1 < 10 ? ('0'+ (d.getMonth() + 1)) : (d.getMonth() + 1)
                const date = d.getDate() < 10 ? ('0'+ (d.getDate())) : d.getDate()
                return `${year}-${month}-${date}`
            }
            const sDate = date(trip.tripStartDate)
            const eDate = date(trip.tripEndDate)
            const endDate = trip.tripEndDate + 1
            res.render('trips/edit', {trip, title: `Edit: ${trip.tripName}`, sDate, eDate})
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
            res.redirect(`/trips`)
        })
        .catch(err => console.log.error)
})
// delete
router.delete('/:id', checkLogin, (req, res) => {
    Trip.findById(req.params.id)
        .then(trip => {
            if(req.user.id == trip.owner) {
                return trip.deleteOne()
            } else {
                res.send('something went wrong')
            }
        })
        .then(data => {
            res.redirect('/trips')
        })
        .catch(err => console.log.error)
})
// show
router.get('/:id', (req, res) => {
    Trip.findById(req.params.id)
        .populate('owner')
        .populate('comments.author')
        .then(trip => {
            res.render('trips/show', { title: trip.tripName, trip})
        })
        .catch(err => console.log.error)
})

// export
module.exports = router