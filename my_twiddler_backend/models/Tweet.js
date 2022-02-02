const mongoose = require('mongoose');
const moment = require('moment');
const Schema = mongoose.Schema;

const TweetSchema = new mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    userName: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        default: () => Date.now()
    }
});

module.exports = mongoose.model('Tweet', TweetSchema);