var express = require('express');
var router = express.Router();
const imageModel = require('../models/images');
/* GET users uploads */
router.get('/', function(req, res, next) {
    if(req.user) {
        imageModel.getAllImages(req.user.id, function(err, data){
            if (err) return next(err);
            res.render("user", {image: data});
        });

    }
    else{
        req.session.FlashMessage = 'Please Login to continue.';
        res.redirect('/');
    }
});

module.exports = router;
