const User=require('../models/user')

module.exports.userHome=function(req,res){
    
    return res.render('userhome.ejs',{
        title:'User home'
    })
};

// Action to render the userprofile page
module.exports.userProfile=function(req,res){
    if (req.cookies.user_id){
        User.findOne({_id:req.cookies.user_id}).then(function(user){
            if (user){
                return res.render('userprofile.ejs',{
                    title:"Profile",
                    user:user
                });
            } else {
                return res.redirect('/users/sign-in');
            }
            
            
        }).catch(function(err) {
             console.log(`error while finding user_id from cookies : ${err}`)
             return res.redirect('/users/sign-in')
            })

    } else {
        return res.redirect('/users/sign-in');
    }
    
};

//Action to reder the signup page
module.exports.signUp=function(req,res){
    return res.render('user-sign-up.ejs',{
        title:'SignUp'
    })
};

//Action to reder the signin page
module.exports.signIn=function(req,res){
    return res.render('user-sign-in.ejs',{
        title:'SignIn'
    })
};


// Action to create new user
module.exports.create=function(req,res){
    if (req.body.password != req.body.confirm_password){
        console.log('Password is not same!')
        return res.redirect('back');
    };

    User.findOne({email:req.body.email}).then(function(user){

        if(!user) {
            User.create(req.body).then(function(newUser){
                console.log(`Signup is succesfull! ${newUser}`);
                return res.redirect('/users/sign-in');
            }).catch(err => console.log(`Erorr while create new user during signup : ${err}`))
        } else{
            console.log('This mail id is already taken!')
            return res.redirect('back');
        };
    }).catch(err => console.log(`Error while finding the user while signup : ${err}`))

};

// Action for create-seesion to existing user
// sign in and create the session for users
module.exports.createSession=function(req,res){
    // finding the email from db
    User.findOne({email: req.body.email}).then(function(user){
        
        if(user) {
            // checking the password
            if (user.password == req.body.password) {
                res.cookie('user_id',user._id);
                return res.redirect('/users/profile');
            } else {
                console.log(`password is not correct. Kindly retype the password!`);
                return res.redirect('back');
            }

        } else {
            console.log(`This user is not available`);
            return res.redirect('back');
        }
    }).catch(err => console.log(`Error while finding the user details during session creation :${err} `))
};


// Action to sign out from user profile
module.exports.signout=function(req,res){
    res.cookie('user_id',1);
    return res.redirect('/users/sign-in')
};