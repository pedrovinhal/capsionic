var express     = require('express'),
    mongoose   = require('mongoose'),
    bodyParser  = require('body-parser'),
    
    Student     = require('../models/student');
    
    
var studentRouter = express.Router();
studentRouter.use(bodyParser.json());

studentRouter.route('/:id')
.get(function(req, res, next) {
    Student.findById(req.params.id)
        .populate('subjects.subject')
        .populate('subjects.reportSums')
        .populate('reports')
        .populate('totalSums')
        .exec(function(err, team) {
            if(err) return next(err);
            
            else {
                res.json(team);
            }
    });
});


module.exports = studentRouter;