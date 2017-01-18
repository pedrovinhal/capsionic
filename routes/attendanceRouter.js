var express     = require('express'),
    mongoose   = require('mongoose'),
    bodyParser  = require('body-parser'),
    
    Attendance  = require('../models/attendance');
    
    
var attendanceRouter = express.Router();
attendanceRouter.use(bodyParser.urlencoded({extended: false}));
attendanceRouter.use(bodyParser.json());

attendanceRouter.route('/:id')
.put(function(req, res, next) {
    console.log(req.body);
    console.log(req.params.id);
    Attendance.findByIdAndUpdate(
        req.params.id,
        {
            present: req.body.present,
            late: req.body.late
        },
        function(err, attendance) {
            if(err) return next(err);
            
            else {
                res.send('ok');
            }
        }
    );
});

module.exports = attendanceRouter;