// bring in mongoose connection from utils folder
const mongoose = require('../utils/connection')

// import commentSchema, to be used as subdoc
const commentSchema = require('./comment')
const taskSchema = require('./task')

const { Schema, model } = mongoose

// trip schema
const tripSchema = new Schema({
    tripName: {
        type: String,
        required: true
    },
    // need to check to update with both start and end date
    tripStartDate: {
        type: Date,
        required: true
    },
    tripEndDate: {
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
    attendees: [String],
    tasks: [taskSchema],
    comments: [commentSchema]
}, {
    timestamps: true
})

const Trip = model('Trip', tripSchema)

// export
module.exports = Trip