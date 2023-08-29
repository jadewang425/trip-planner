const express = require('express');
const router = express.Router();
const passport = require('passport');


// google oauth login route
router.get('/auth/google', passport.authenticate(
    'google',
    {scope: ['profile', 'email']}
));
    

// google oath callback route
router.get('/oauth2callback', passport.authenticate(
    'google',
    {successRedirect: '/', failureRedirect: '/'}
));

// google oauth logout route
router.get('/logout', function(req, res) {
    req.logout(function() {
        res.redirect('/');
    });
});

// export
module.exports = router;