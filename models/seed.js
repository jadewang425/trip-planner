const mongoose = require('../utils/connection');
const Trip = require('./trip');

// 1. db variable
const db = mongoose.connection

// 2. one-time connection
db.on('open', () => {
    const startTrips = [
        {tripName: 'Barcelona & Madrid', tripStartDate: '2023/10/21', tripEndDate: '2023/10/29', tripDesc: "MM's wedding"},
        {tripName: 'New Year 2024', tripStartDate: '2023/12/23', tripEndDate: '2024/01/05', tripDesc: 'New Year Eve in TW!'}
    ]
    Trip.deleteMany({ owner: null })
        .then(() => {
            Trip.create(startTrips)
                .then(data => {
                    console.log('these are the starting trips', data)
                    db.close()
                })
                .catch(err => {
                    console.log('===err in models/seed===')
                    console.log(err)
                    console.log('===err in models/seed===')
                    // only in production for developer for now
                    db.close()
                })
        })
        .catch(err => {
            console.log('===err in models/seed===')
            console.log(err)
            console.log('===err in models/seed===')
            // only in production for developer for now
            db.close()
        })
})