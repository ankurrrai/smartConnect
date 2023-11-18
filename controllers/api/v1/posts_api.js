
const Post=require('../../../models/post');
const Comment=require('../../../models/comment');


module.exports.index= async function(req,res){

    try {
        let post=await Post.find({})
        .sort('-createdAt')
        .populate({
            path:'user',
            select:'-password'
        })
        .populate({
            path:'comment' ,
            populate:{
                path:'user',
                select:'-password'
            }
        });

        return res.status(200).json({
            message:'success V1',
            posts:post
        })
    
    } catch (err) {
        console.log(`Error in post_controlllers -> index`)
        console.log(`Error Description ${err}`)
        return res.status(500).json({
            message:'Invalid!'
        })
    }
    
}
module.exports.destroy=async function(req,res){
    try {
        let queryid=req.query.id;
        let post=await Post.findOne( {_id:queryid} )

            if (req.user.id==post.user){
            let postdelete=await Post.deleteOne({_id:post.id});
            let commentdeletecount=await Comment.deleteMany({post:queryid});
            
            return res.status(200).json({
                message:'success',
            })
        } else{
            return res.status(401).json({
                message:'You can not able to delete this'
            })
        }
        
    
    } catch (err) {
        console.log(`Error in post_controlllers -> destroy`)
        console.log(`Error Description ${err}`)
        return res.status(500).json({
            message:'Invalid!'
        })
    }
    
}