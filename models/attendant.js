// bring in mongoose connection from utils folder
const mongoose = require('../utils/connection')

const { Schema } = mongoose

const attendantSchema = new Schema({
    attName: {
        type: String,
        required: true
    },
    attEmail: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = attendantSchema