var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
    name: String,
    order: Number, // demo purpose only
    timetable: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'Timetable'}
        
    },
    students: [{type: mongoose.Schema.Types.ObjectId, ref: 'Student'}],
    subjects: [
        {
            subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
            reportSums: {
                AB: {type: Number, default: 0},
                LA: {type: Number, default: 0},
                MA: {type: Number, default: 0},
                BH: {type: Number, default: 0},
                SR: {type: Number, default: 0}
            }
        }
    ],
    reports: [{type: mongoose.Schema.Types.ObjectId, ref: 'Report'}],
    totalSums: {
        AB: {type: Number, default: 0},
        LA: {type: Number, default: 0},
        MA: {type: Number, default: 0},
        BH: {type: Number, default: 0},
        SR: {type: Number, default: 0}
    }    
    
});

module.exports = mongoose.model('Team', teamSchema);