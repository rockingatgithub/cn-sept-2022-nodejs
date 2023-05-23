const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/job_portal')

const db = mongoose.connection

db.once('open', () => { console.log('DB connected successfully!') })

module.exports = db