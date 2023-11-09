
const Post=require('../models/post');

module.exports.create=function(req,res){
    Post.create({
        content:req.body.content,
        user:res.locals.user._id
    }).then(function(newPost){
        console.log(`added new post ${newPost}`);
        return res.redirect('back');
    }).catch(function(err){
        console.log('Error while adding the post.');
    })
}