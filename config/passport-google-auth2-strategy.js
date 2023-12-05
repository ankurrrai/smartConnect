const passport=require('passport');
const googleStrategy=require('passport-google-oauth').OAuth2Strategy;
const crypto=require('crypto');
const User=require('../models/user');

passport.use(new googleStrategy(
    {
        clientID:'clientid',
        clientSecret:'secrectkey',
        callbackURL:'http://localhost:8000/users/auth/google/callback'
    },
    function(accessToken,refreshToken,profile,done){
        User.findOne({email:profile.emails[0].value}).then(function(user){
            if (!user){
                User.create({
                    email:profile.emails[0].value,
                    name:profile.displayName,
                    password:crypto.randomBytes(20).toString('hex')
                }).then(function(newUser){
                    return done(null,newUser)
                }).catch(function(err){
                    console.log('Error in passport-google-auth2 while adding the new User : ',err);
                })
            } else {
                return done(null,user)
            }

        }).catch(function(err){
            console.log('Error in passport-google-auth2 while seraching the user : ',err);
        })
    }
))

module.exports=passport;
