const passport=require('passport');
const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;

const User=require('../models/user');


let opts={
    jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:'smartConnect'
}


passport.use(new JwtStrategy(opts,function(jwt_payload,done){
    User.findById(jwt_payload._id).then(function(user){
        if (user){
            return done(null,user);
        } else {
            return done(null,false);
        }
    }).catch(function(err){
        console.log(`Error in passport-jwt-startegy ${err}`)
        return done(err,false)
    })
}));


module.exports=passport