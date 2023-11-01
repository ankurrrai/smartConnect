const User=require('../models/user')

module.exports.userHome=function(req,res){
    
    console.log(req.cookies)
    res.cookie('user_pass',10)
    return res.render('userhome.ejs',{
        title:'User home'
    })
};

// Action to render the userprofile page
module.exports.userProfile=function(req,res){
    return res.render('userprofile.ejs',{
        title:"Profile"
    })
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
module.exports.createSession=function(){
    // todo
}