// bring in mongoose connection from utils folder
const mongoose = require('../utils/connection')

// import commentSchema, to be used as subdoc
const commentSchema = require('./comment')

const { Schema, model } = mongoose

// trip schema
const tripSchema = new Schema({
    tripName: {
        type: String,
        required: true
    },
    // need to check to update with both start and end date
    tripDates: {
        type: Date,
        required: true
    },
    tripDesc: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    tasks: [String],
    comments: [commentSchema]
}, {
    timestamps: true
})

const Trip = model('Fruit', fruitSchema)

// export
module.exports = Trip