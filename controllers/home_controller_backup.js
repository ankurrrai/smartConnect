
const Post=require('../models/post');
const { populate } = require('../models/user');

module.exports.home=function(req,res){
    // console.log(req.cookies)
    if (req.isAuthenticated()){

        // Post.find({user:res.locals.user._id}).then(function(post){
        //     return res.render('home.ejs',{
        //         title:'Home',
        //         post:post
        //     })
        // }).catch(function(err){
        //     console.log('Error in rendering the post.');
        //     return
        // });

        Post.find({user:res.locals.user._id}).populate('user').exec().then(function(post){
            return res.render('home.ejs',{
                title:'Home',
                post:post
            })
        }).catch(function(err){
            console.log('Error in rendering the post.');
            return
        });
    } else{
        
        return res.redirect('/users/sign-in')
    }
    
    
};


