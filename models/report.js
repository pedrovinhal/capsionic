var mongoose = require('mongoose');

var reportSchema = new mongoose.Schema({
    student: String,
    team: String,
    subject: String,
    hour: String,
    type: String,
    description: String
}, {timestamps: true});

module.exports = mongoose.model('Report', reportSchema);