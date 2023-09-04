// bring in mongoose connection from utils folder
const mongoose = require('../utils/connection')

const { Schema } = mongoose

const attendantSchema = new Schema({
    attName: String,
    attEmail: String
}, {
    timestamps: true
})

module.exports = attendantSchema