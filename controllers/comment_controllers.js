const Comment=require('../models/comment');
const Post=require('../models/post');
const commentsMailer=require('../mailers/comments_mailer');
const queue=require('../config/kue');
const commentsWorker=require('../workers/comments_worker');

const Like= require('../models/likes');

module.exports.create= async function(req,res){

    try{
        let post=await Post.findOne({_id:req.body.post})
        let new_comment=await Comment.create({
            content:req.body.content,
            user:res.locals.user._id,
            post:post._id
            
        })

        post.comment.push(new_comment);
        post.save();
        new_comment =await Comment.findOne({_id:new_comment._id}).populate({
            path:'user',
            select:'-password'
        })

        // //commentsMailer.newComment(new_comment); //called to send the email 
        // let job=queue.create('emails',new_comment).save(function(err){
        //     if (err){console.log('comment_controllers : Error in sending queue ',err);return;}

        //     console.log('comment_controllers: job Enqueued - ',job.id)
        // });
        
        if (req.xhr){
            return res.status(200).json({
                data:{
                    new_comment:new_comment
                },
                message:'Comment Added!'
            })
        }

        req.flash('success','Comment added!')
        return res.redirect('/')  

    }catch(err){
        req.flash('error',err)
        console.log(`Error in comment_controlllers -> create`)
        console.log(`Error Description ${err}`)
        return res.redirect('back')
    } 


};

module.exports.destroy=async function(req,res){

    try{

        let comment=await Comment.findOne({_id:req.query.id}).populate('user').populate('post');
        if (comment.user.id==res.locals.user.id || comment.post.user==res.locals.user.id) {

            let postid=comment.post.id;
            let deletcmnt=await Comment.deleteOne({_id:req.query.id});

            let post=await Post.findByIdAndUpdate(postid,{$pull : {comment: req.query.id}})
            
            let count=await Like.deleteMany({likeable:comment,onmodel:'Comment'});
            console.log('comment count: ',count)
            if (req.xhr){
                return res.status(200).json({
                    data:{
                        comment_id:req.query.id
                    },
                    message:'Comment Deleted!'
                });
            }

            req.flash('success','Comment Deleted!')
            return res.redirect('back')
        }
    }catch(err){
        req.flash('error',err)
        console.log(`Error in comment_controlllers -> destroy`)
        console.log(`Error Description ${err}`)
        return res.redirect('back')
    }
}
