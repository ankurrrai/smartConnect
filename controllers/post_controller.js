
const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=async function(req,res){

    try {
        let newPost=await Post.create({
            content:req.body.content,
            user:res.locals.user._id
        });
        newPost=await Post.findOne({_id:newPost._id}).populate('user')
        newPost.user.password=''
            // Added AJAX
            if (req.xhr){
                return res.status(200).json({
                    data: {
                        newPost:newPost
                    },
                    message:'Post Created'
                })
            }

        req.flash('success','Post Published!') //we can remove this as it is not in use but still keeping
        return res.redirect('back');
    } catch (err) {
        req.flash('error',err)
        console.log(`Error in post_controlllers -> create`)
        console.log(`Error Description ${err}`)
        return res.redirect('back')
    }
    
};

module.exports.destroy=async function(req,res){
    try {
        let queryid=req.query.id;
        let post=await Post.findOne( {_id:queryid} )
        if (res.locals.user.id==post.user){
            let postdelete=await Post.deleteOne({_id:post.id});
            let commentdeletecount=await Comment.deleteMany({post:queryid});

            if (req.xhr) {
                return res.status(200).json({
                    data:{
                        post_id:queryid
                    },
                    message:'Post Deleted!'
                })
            }

            req.flash('success','Post and associated comment deleted!') //we can remove this as it is not in use but still keeping
            return res.redirect('back')
        }else{
            return res.redirect('back')
        }
    } catch (err) {
        req.flash('error',err)
        console.log(`Error in post_controlllers -> destroy`)
        console.log(`Error Description ${err}`)
        return res.redirect('back')
    }
    
}