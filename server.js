// import dependencies
const express = require('express')
require('dotenv').config()
const path = require('path')
const middleware = require('./utils/middleware')

// routers/controllers

const app = express()

// setup view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middleware
middleware(app)

// routes
app.get('/', (req, res) => {
    res.send('Trip Planner Homepage')
})

// server listener
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log('App is ready to go!')
})