var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
    username: {
        type: String,
        unique: true
    },
    googleid: {
        type: String,
        unique: true
    },
    images: []
});

var user = module.exports = mongoose.model('user', userSchema);

module.exports.getDetails = function(id, callback){
    user.findOne({googleid: id}, callback);
};

module.exports.addDetails = function(details, callback){
    user.create(details, callback);
};

module.exports.getById = function(id, callback){
    user.findById(id, callback);
};
