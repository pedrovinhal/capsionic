var mongoose = require('mongoose');

var attendanceSchema = new mongoose.Schema({
    student: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
        name: String
    },
    present: {type: Boolean, default: false},
    late: {type: Boolean, default: false}
});

module.exports = mongoose.model('Attendance', attendanceSchema);