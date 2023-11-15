
const Post=require('../models/post');
const User= require('../models/user');

module.exports.home=async function(req,res){

    try{
        let post=await Post.find({})
        .sort('-createdAt')
        .populate('user')
                .populate({
                    path:'comment' ,
                    populate:{
                        path:'user'
                    }
                });
        let all_users=await User.find({})
        
        return res.render('home.ejs',{
            title:'Home',
            post:post,
            all_users:all_users
        })

    }catch(err){
        console.log(`Error in home_controlllers -> home`)
        console.log(`Error Description ${err}`)
        return res.redirect('back')
    }
    
};



