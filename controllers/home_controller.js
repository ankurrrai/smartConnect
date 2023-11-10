
const Post=require('../models/post');
const User= require('../models/user');

module.exports.home=function(req,res){

    Post.find({})
    .populate('user')
    .populate({
        path:'comment' ,
        populate:{
            path:'user'
        }
    })
    .exec().then(function(post){
        User.find({}).then(function(all_users){
            return res.render('home.ejs',{
                title:'Home',
                post:post,
                all_users:all_users
            })
        }).catch(function(err){
            console.log(`Error while find all users : home _controller`)
        })
        
    }).catch(function(err){
        console.log('Error in rendering the post.');
        return
    });


    
};



