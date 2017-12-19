var express = require('express');
var router = express.Router();
var imageModel = require('../models/images');
var flag;
/* GET homepage which shows all images uploaded by users. */
router.get('/', function(req, res, next) {
    if(req.user) {
        flag =1;
    }
    else {
        flag = 0;
    }
    imageModel.getEverything(function(err, data){
        if(err) return next(err);
        res.render("index", {data: data});
    });
});

module.exports = router;
