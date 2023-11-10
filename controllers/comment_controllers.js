const Comment=require('../models/comment');
const Post=require('../models/post');
const { populate } = require('../models/user');

module.exports.create=function(req,res){
    // console.log(res.locals.user._id)
    // req.body.post which is post id
    Post.findOne({_id:req.body.post}).then(function(post){
        
        Comment.create({
            content:req.body.content,
            user:res.locals.user._id,
            post:post._id
            
        }).then(function(new_comment){
            // console.log(new_comment._id)
            post.comment.push(new_comment);
            post.save();
            return res.redirect('/')
        }).catch(function(err){
            console.log('Error while add the post : comment_controllers.js')
            return res.redirect('back')
        })
    }).catch(function(err){
        console.log(`Error in finding post : comment_controllers.js`)
        return res.redirect('back')
    })

};

module.exports.destroy=function(req,res){
    Comment.findOne({_id:req.query.id}).populate('user').populate('post').exec()
    .then(function(comment){
        if (comment.user.id==res.locals.user.id || comment.post.user==res.locals.user.id) {
            let postid=comment.post.id;
            
            Comment.deleteOne({_id:req.query.id}).catch(function(err){
                console.log('Error while removing comment : comment_controller');
            });
            Post.findByIdAndUpdate(postid,{$pull : {comment: req.query.id}}).then(function(post){
                return res.redirect('back');
            }).catch(function(err){
                console.log('error while removing comment from post array : comment_controller')
            })
        }else {
            return res.redirect('back');
        }
    }).catch(function(err){
        console.log(`Error while finding the comment : comment_controllers`);
    })
}
