// crud-helper.js

// Used to perform CRUD external to the application

// To use (don't type the $'s):
//   1. Open a Node REPL in Terminal:
//         $ node

//   2. Load this crud-helper.js module
//         $ .load crud-helper.js

//   3. When done CRUDing, exit the REPL with:
//         $ .exit (or ctrl-D, or ctrl-C twice)

// If any changes are made to the models, 
// exit the REPL and reload this module


// If the db connection string is in a .env file, we need 
// to read in those env variables just like in server.js
require('dotenv').config();
// Connect to the database
require('./utils/connection');

// Require the app's Mongoose models
const Trip = require('./models/trip');
const Comment = require('./models/comment');

// Example CRUD

// Top-level await (using await outside of an async function)
// has been available since Node v14.8
// let movies = await Movie.find({});
// console.log(movies);
Trip.find({})
    .then(trips => console.log('These are the trips', trips))
    .catch(err => console.log(err))


// // // // // // // // // // // // // // // // // // //
// The code below will update the entire comments array to an empty array
// Trip.updateMany({}, { comments: [] })
//     .then(data => console.log('response after clearing comments', data))
//     .catch(error => console.log(error))
// // // // // // // // // // // // // // // // // // //

// // // // // // // // // // // // // // // // // // //
// The code below will update the entire tasks array to an empty array
// Trip.updateMany({}, { tasks: [] })
//     .then(data => console.log('response after clearing comments', data))
//     .catch(error => console.log(error))
// // // // // // // // // // // // // // // // // // //