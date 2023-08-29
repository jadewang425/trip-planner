// import dependencies
const express = require('express');
require('dotenv').config()

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
        .catch(err => {
            console.log('===err===')
            console.log(err)
            console.log('===err===')
            // only in production for developer for now
            return res.send('err - tripControl, index - checl terminal')
        })
})
// new
router.get('/new', (req, res) => {
    res.send('the new page')
})
// create
// edit
router.get('/:id/edit', (req, res) => {
    Trip.findById(req.params.id)
        .then(trip => {
            console.log('found this trip', trip)
            
            res.send(`Edit page for ${trip.tripName}`)
        })
        .catch(err => {
            console.log('===err===')
            console.log(err)
            console.log('===err===')
            // only in production for developer for now
            return res.send('err - tripControl, edit - checl terminal')
        })
})
// update
// delete
// show
router.get('/:id', (req, res) => {
    Trip.findById(req.params.id)
        .then(trip => {
            // console.log('found this trip', trip)
            // res.json(trip)
            res.render('trips/show', { title: trip.tripName, trip})
        })
        .catch(err => {
            console.log('===err===')
            console.log(err)
            console.log('===err===')
            // only in production for developer for now
            return res.send('err - tripControl, show - checl terminal')
        })
})

// export
module.exports = router