var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/login', function(req, res, next) {
    res.end("login route.")
});

router.get('/logout', function(req, res, next) {
    res.end("logout route");
});

router.get('/google', function(req, res, next) {
    res.end("google route");
});
module.exports = router;
