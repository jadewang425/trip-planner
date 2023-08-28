// dependencies

require('dotenv').config()
const mongoose = require('mongoose')

// DB connection
const DATABASE_URL = process.env.DATABASE_URL

// DB config object
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// establish connection to MongoDB
mongoose.connect(DATABASE_URL, CONFIG)

// tell mongoose what to do
mongoose.connection
    .on('open', () => console.log('mongoose connected'))
    .on('close', () => console.log('mongoose disconnected'))
    .on('error', (err) => console.log('mongoose error\n', err))

// export connection
module.exports = mongoose