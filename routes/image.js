var express = require('express');
var router = express.Router();
const user = require('../models/users');
const imageModel = require('../models/images');
/* GETS page to upload images. */
router.get('/', function(req, res, next) {
    if(req.user) {
        res.render('image', {user: req.user});
    }
    else{
        req.session.FlashMessage = "Please Login to continue.";
        res.redirect('/');
    }
});

router.post('/', function(req, res, next){
    if(req.user){
        var link = req.body.link;
        var description = req.body.desc;
        user.getById(req.user.id, function(err, User){
            if(err) next(err);
            var document = {
                url: link,
                description: description,
                ownerId: User.id,
                likedBy: []
            };
            imageModel.addImage(document, function(err, image){
                User.images.push(image.id);
                User.save(function (err, update) {
                    if (err) next(err);
                    req.session.FlashMessage = 'Image Successfully Updated.';
                    res.redirect('/Image');
                });
            });
        });
    }
    else{
        res.redirect('/');
    }
});
module.exports = router;
