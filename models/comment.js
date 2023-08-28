// bring in mongoose connection from utils folder
const mongoose = require('../utils/connection')

const { Schema } = mongoose

const commentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})

module.exports = commentSchema