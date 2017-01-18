var mongoose = require('mongoose');

var lessonSchema = new mongoose.Schema({
    pristine: {type: Boolean, deafult: true},
    team: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'Team'},
        name: String
    },
    hour: String, //from hour.display
    order: Number, // demo purpose only
    subject: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
        name: String
    },
    attendances: [{type: mongoose.Schema.Types.ObjectId, ref: 'Attendance'}],
    reports: [{type: mongoose.Schema.Types.ObjectId, ref: 'Report'}]
}, {timestamps: true});

module.exports = mongoose.model('Lesson', lessonSchema);