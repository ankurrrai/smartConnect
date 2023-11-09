const passport=require('passport');
const LocalStaregy=require('passport-local').Strategy;

// importing the model
const User=require('../models/user');

// Authentication using passport
passport.use(new LocalStaregy({
        usernameField:'email'
    },
    function(email,password,done){
        // to find the username/email from db
        User.findOne({email:email}).then(function(user){

            if (!user || user.password!=password){
                console.log(`Invalid username or password!`);
                return done(null,false);
            };

            return done(null,user);

        }).catch(function(err){
            console.log(`Error in finding the user in authentication : ${err}`);
            return done(err);
        });
    }
));


// serializing the user to decide which key is to kept inn the cookies
passport.serializeUser(function(user,done){
    return done(null,user.id);
});

// deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){
    User.find({_id:id}).then(function(user){
        return done(null,user);
    }).catch(function(err){
        console.log(`Error while deserialize the user : ${err}`);
        return done(err);
    })
});


// check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    // if the user is signed in, then pass on the request to the  next function (controller action)
    if (req.isAuthenticated()){
        return next();
    }
    // if the user is not sign in
    return res.redirect('/users/sign-in');
};

// set the authenticated user 
passport.setAuthenticatedUser=function(req,res,next){
 
    if (req.isAuthenticated()){
        res.locals.user=req.user[0];
    }
    return next();
};