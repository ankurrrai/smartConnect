
const Post=require('../models/post');
const Comment=require('../models/comment');

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
};

module.exports.destroy=function(req,res){
    
    let queryid=req.query.id;

    Post.findOne( {_id:queryid} ).then(function(post){
        console.log(res.locals.user.id==post.user)
        if (res.locals.user.id==post.user){
            // post.remove();
            Post.deleteOne({_id:post.id}).catch(function(err){
                console.log(`error while removing  post in : post_controller `)
            });
            Comment.deleteMany({post:queryid}).then(function(deleteCount){
                console.log(deleteCount);
                return res.redirect('back')
            }).catch(function(err){
                console.log(`error while removing comment for deleted post in : post_controller `)
            });
        } else{
            return res.redirect('back')
        }

    }).catch(function(err){
        console.log(`error while find the post for destroy : post_controller`)
        return res.redirect('back')
    })
}