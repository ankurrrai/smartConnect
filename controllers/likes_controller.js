const Post=require('../models/post');
const Comment=require('../models/comment');
const Like=require('../models/likes');

module.exports.toggleLike= async function(req,res){
    try {
        
        // likes/toggle/?id=abbx&type=Post/Comment
        let likeable;
        let deleted=false;
        // console.log(req.url)
        if (req.query.type=='Post'){
            likeable=await Post.findById(req.query.id);
        }else {
            likeable=await Comment.findById(req.query.id)
        }

        let existinglike=await Like.findOne({
            user:req.user[0]._id,
            likeable:req.query.id,
            onmodel:req.query.type
        })

        if (existinglike){
            likeable.likes.pull(existinglike._id);
            likeable.save();

            // existinglike.remove().exec();
            let count = await Like.deleteOne({_id:existinglike._id})
            
            deleted=true
        } else {
            let newLike=await Like.create({
                user:req.user[0]._id,
                likeable:req.query.id,
                onmodel:req.query.type
            });
            likeable.likes.push(newLike._id);
            likeable.save();
        }
        
        return res.status(200).json({
            messasge:'success',
            data:{
                deleted:deleted
            }
        })


    } catch (err) {
        console.log('likes_controller -> toggleLike : ',err);
        return res.status(501).json({
            messasge:'Error'
        })
    }
}