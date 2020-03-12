const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        requied: true
    },
    email: {
        type: String,
        requied: true
    },
    password: {
        type: String,
        requied: true
    },
    avatar: String,
    Date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', userSchema);