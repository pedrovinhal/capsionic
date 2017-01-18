var mongoose = require('mongoose');

var sumSchema = new mongoose.Schema({
    AB: {type: Number, default: 0},
    LA: {type: Number, default: 0},
    MA: {type: Number, default: 0},
    BH: {type: Number, default: 0},
    SR: {type: Number, default: 0}
});

module.exports = mongoose.model('Sum', sumSchema);