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
            res.render('home', { title: 'Trip Planner', trips})
        })
        .catch(err => console.log.error)
})

// export
module.exports = router