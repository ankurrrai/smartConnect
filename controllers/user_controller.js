const User=require('../models/user')
const FriendShip=require('../models/friends')
const fs=require('fs');
const path=require('path');

module.exports.userHome=function(req,res){
    
    // console.log(req.cookies)
    // res.cookie('user_pass',10)

    if (req.isAuthenticated()){ //isAuthenticated is passport function
        return res.redirect('/users/profile')
    };
    
    return res.render('userhome.ejs',{
        title:'User home'
    })
};

// Action to render the userprofile page
module.exports.userProfile=async function(req,res){
    try {
        let currUser=await User.findById(req.query.id).populate({
            path:'friendship',
            populate:{
                path:'from_user to_user',
                select:'-password'
            }
        }).select('-password');
        let friend=await FriendShip.findOne({
            to_user:currUser._id,
            from_user:req.user[0]._id,
        }).populate('from_user to_user');
        if (friend) {
            return res.render('userprofile.ejs',{
                title:"Profile",
                currUser:currUser,
                friend:friend,
                friendFound:true
            });
        }
        friend=await FriendShip.findOne({
            from_user:currUser._id,
            to_user:req.user[0]._id,
        }).populate('from_user to_user')
        if (friend) {
            return res.render('userprofile.ejs',{
                title:"Profile",
                currUser:currUser,
                friend:friend,
                friendFound:true
            });
        }
        return res.render('userprofile.ejs',{
            title:"Profile",
            currUser:currUser,
            friend:'',
            friendFound:false
        });
    } catch (err) {
        console.log(`Error in user_controller -> userProfile`)
        console.log(`Error Description ${err}`)
        return res.status(401).send('Not Found')
    }
    
    
};

// Action to update the user details
module.exports.update=async function(req,res){
    try {
        if (req.user[0].id==req.query.id){
            // let user=await User.findByIdAndUpdate(req.query.id,req.body);
            let user=await User.findById(req.query.id);
            
            // called statics function which we created in user model
            // Multer used to fetch the profile picture
            User.uploadedAvatar(req,res,function(err){
                if (err){console.log('*****Multer Error :',err)};
                user.name=req.body.name;
                user.email=req.body.email;

                // need to delete previous avatar if it is there
                if (user.avatar && fs.existsSync(path.join(__dirname,'..',user.avatar))) {
                    fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                }

                if(req.file){
                    // File Path which we are updating for profile picture
                    user.avatar=User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back')

            });
            // return res.redirect('back')
        }else{
            return res.status(401).send('Unauthorized')
        }
        
    } catch (err) {
        console.log(`Error in user_controller -> update`)
        console.log(`Error Description ${err}`)
        return res.status(401).send('Not Found')
    }
    
}

//Action to reder the signup page
module.exports.signUp=function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/')
    }

    return res.render('user-sign-up.ejs',{
        title:'SignUp'
    })
};

//Action to reder the signin page
module.exports.signIn=function(req,res){

    if(req.isAuthenticated()){  //Built in function
        return res.redirect('/')
    }

    return res.render('user-sign-in.ejs',{
        title:'SignIn'
    })
};



// Action to create new user
module.exports.create=async function(req,res){


    try {
        if (req.body.password != req.body.confirm_password){
            console.log('Password is not same!')
            return res.redirect('back');
        };


        let user=await User.findOne({email:req.body.email})
        if (!user){
            let newUser=await User.create(req.body);
            req.flash('success','Successfully Sign Up, please login..');
            
        } else{
            req.flash('success','This email is already in use, please login..');
        }
        
        return res.redirect('/users/sign-in')
    } catch (err) {
        req.flash('error',err)
        console.log(`Error in user_controller -> create`)
        console.log(`Error Description ${err}`)
        return res.redirect('back')   
    }
    

};

// Action for create-seesion to existing user
// sign in and create the session for users
module.exports.createSession=function(req,res){
    req.flash('success','logged in successfully!')
    return res.redirect('/');
}

// action to signout
module.exports.destroySession=async function(req,res,next){


    req.logout(function(err){ //Also have  doubt to clear on this
        if(err){
            return next(err);
        }
        req.flash('success','Logged Out!')
        return res.redirect('/')
    }); //logout is passport function to remove the cookies

    
}