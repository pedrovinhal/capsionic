var express     = require('express'),
    mongoose   = require('mongoose'),
    bodyParser  = require('body-parser'),
    
    Team       = require('../models/team'),
    Lesson     = require('../models/lesson');
    
    
var teamRouter = express.Router();
teamRouter.use(bodyParser.json());

teamRouter.route('/')
.get(function(req, res, next) {
    Team.find({}, function(err, teams) {
        if(err) return next(err);
        
        else {
            res.json(teams);
        }
    });
});

teamRouter.route('/:name/dashboard')
.get(function(req, res, next) {
    Team.findOne({name: req.params.name})
        .populate('subjects.subject')
        //.populate('subjects.reportSums')
        .populate('reports')
        //.populate('totalSums')
        .exec(function(err, team) {
            if(err) return next(err);
            
            else {
                res.json(team);
            }
    });
});

teamRouter.route('/:name/students')
.get(function(req, res, next) {
    Team.findOne({name: req.params.name})
        .populate('students')
        .populate({
            path: 'students',
            populate: {
                path: 'totalSums'
            }
        })
        /*.populate('students.totalSums')*/
        .exec(function(err, team) {
            if(err) return next(err);
            
            else {
                res.json(team);
            }
        });
});

teamRouter.route('/:name/lessons')
.get(function(req, res, next) {
    Lesson.find({'team.name': req.params.name})
        .populate('reports')
        .exec(function(err, team) {
            if(err) return next(err);
            
            else {
                res.json(team);
            }
        });
});

teamRouter.route('/:name/new_lesson')
.get(function(req, res, next) {
    Lesson.findOne({'team.name': req.params.name})
        .sort('created_at')
        .populate('attendances')
        .populate({
            path: 'attendances',
            populate: {
                path: 'student.id',
                populate: {
                    path: 'totalSums'
                }
            }
        })
        .exec(function(err, lesson) {
        if(err) return next(err);
        
        else {
            res.json(lesson);
        }
    });
})

teamRouter.route('/:name/single_lesson')
.get(function(req, res, next) {
    Lesson.findOne({'team.name': req.params.name, order: 5})
        //.sort('-created_at')
        .populate('attendances')
        .populate({
            path: 'attendances',
            populate: {
                path: 'student.id',
                populate: {
                    path: 'totalSums'
                }
            }
        })
        .exec(function(err, lesson) {
        if(err) return next(err);
        
        else {
            res.json(lesson);
        }
    });
});

teamRouter.route('/:name/single_lesson/:id')
.get(function(req, res, next) {
    Lesson.findById(req.params.id)
        .populate('attendances')
        .populate({
            path: 'attendances',
            populate: {
                path: 'student.id',
                populate: {
                    path: 'totalSums'
                }
            }
        })
        .exec(function(err, lesson) {
        if(err) return next(err);
        
        else {
            res.json(lesson);
        }
    });
})

;

module.exports = teamRouter;