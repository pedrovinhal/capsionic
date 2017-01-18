var mongoose = require('mongoose');

var studentSchema = new mongoose.Schema({
    name: String,
    number: Number,
    foto: String,
    team: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
        name: String
    },
    subjects: [{
        subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
        reportSums: {type: mongoose.Schema.Types.ObjectId, ref: 'Sum'}
    }],
    reports: [{type: mongoose.Schema.Types.ObjectId, ref: 'Report'}],
    totalSums: {type: mongoose.Schema.Types.ObjectId, ref: 'Sum'}
});

module.exports = mongoose.model('Student', studentSchema);