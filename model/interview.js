const mongoose = require('mongoose')

const interviewSchema = new mongoose.Schema({

    companyName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    candidates: [{
        type: mongoose.Types.ObjectId,
        ref: 'Student'
    }]

})

const Interview = mongoose.model('Interview', interviewSchema)
module.exports = Interview