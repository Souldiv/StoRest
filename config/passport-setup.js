const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const user = require('../models/users');

passport.serializeUser(function(user, done){
    done(null, user.id);
});


passport.deserializeUser(function(id, done){
   user.getById(id, function(err, user){
       if(err) throw err;
       done(null, user);
   });
});
passport.use(
    new GoogleStrategy({
        //options for strategy
        clientID: process.env.clientID,
        callbackURL: '/auth/google/redirect',
        clientSecret: process.env.clientSecret
    }, function(accessToken, refreshToken, profile, done){
        // passport callback function
        console.log(profile);
        details = {
            username: profile.name.givenName,
            googleid: profile.id
        };
        console.log(details);
        user.getDetails(profile.id, function(err, data){
            if(err) throw err;
            if(data){
                //user exists
                console.log("user Exists");
                done(null,data);
            }
            else{
                user.addDetails(details, function(err, data){
                    if(err) throw err;
                    console.log("Created User Successfully");
                    done(null, data);
                });
            }
        });
    })
);