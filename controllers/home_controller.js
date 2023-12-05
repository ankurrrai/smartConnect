
const Post=require('../models/post');
const User= require('../models/user');

module.exports.home=async function(req,res){

    try{
        let post=await Post.find({})
        .sort('-createdAt')
        .populate({
            path:'user',
            select:'-password'
        })
                .populate({
                    path:'comment' ,
                    populate:{
                        path:'user likes',
                        select:'-password'
                    },
                    
            })
        .populate({
            path:'likes' ,
        });
        
        // console.log('New print',post[0])

        let all_users=await User.find({}).populate({
            path:'friendship',
            populate:{
                path:'from_user to_user',
                select:'-password'
            }
        }).select('-password')
        
        let currUser;
        if (req.user) {
            currUser=await User.findOne({_id:req.user[0]._id}).populate({
                path:'friendship',
                populate:{
                    path:'from_user to_user',
                    select:'-password'
                }
            }).select('-password');

        }

        

        return res.render('home.ejs',{
            title:'Home',
            post:post,
            all_users:all_users,
            currUser:currUser
        })

    }catch(err){
        console.log(`Error in home_controlllers -> home`)
        console.log(`Error Description ${err}`)
        return res.redirect('back')
    }
    
};



