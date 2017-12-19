var mongoose = require('mongoose');
var schema = mongoose.Schema;

var imageSchema = new schema({
    ownerId: {
        type: String
    },
    description:{
        type: String
    },
    url:{
      type: String
    },
    likedBy: []
});

var imageModel = module.exports = mongoose.model('imageModel', imageSchema);

module.exports.getAllImages = function(id, callback){
    imageModel.find({ownerId: id}, callback);
};

module.exports.addImage = function(details, callback){
    imageModel.create(details, callback);
};

module.exports.getById = function(id, callback){
    imageModel.findById(id, callback);
};

module.exports.getEverything = function(callback){
    imageModel.find({},callback);
};