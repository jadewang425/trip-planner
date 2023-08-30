// bring in mongoose connection from utils folder
const mongoose = require('../utils/connection')

const { Schema } = mongoose

const taskSchema = new Schema({
    item: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

module.exports = taskSchema