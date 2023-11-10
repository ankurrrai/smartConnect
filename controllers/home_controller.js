
const Post=require('../models/post');
const { populate } = require('../models/user');

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
        
        return res.render('home.ejs',{
            title:'Home',
            post:post
        })
    }).catch(function(err){
        console.log('Error in rendering the post.');
        return
    });


    
};


