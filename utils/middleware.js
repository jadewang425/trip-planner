
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
require('./passport');

const middleware = (app) => {
    console.log('middleware function');
    app.use(methodOverride('_method'));
    app.use(morgan('tiny'));
    app.use(express.urlencoded({ extended: true}));
    app.use(express.static('public'));
    app.use(express.json());
    app.use(session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        res.locals.user = req.user;
        next()
    })
}

// export
module.exports = middleware