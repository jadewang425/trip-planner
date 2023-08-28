// bring in mongoose connection from utils folder
const mongoose = require('../utils/connection')

const { Schema, model } = mongoose

// user schema
const userSchema = new Schema({
    name: String,
    googleId: {
        type: String,
        required: true
    },
    email: String,
    avatar: String
}, {
    timestamps: true
})

const User = model('User', userSchema)

// export model
module.exports = User