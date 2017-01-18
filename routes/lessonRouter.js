var express     = require('express'),
    mongoose   = require('mongoose'),
    bodyParser  = require('body-parser'),
    
    Lesson     = require('../models/lesson');
    
    
var lessonRouter = express.Router();
lessonRouter.use(bodyParser.json());

lessonRouter.route('/')
.get(function(req, res, next) {
    Lesson.find({}, function(err, lessons) {
        if(err) return next(err);
        
        else {
            res.json(lessons);
        }
    });
});


module.exports = lessonRouter;