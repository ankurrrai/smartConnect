const Friendship=require('../models/friends');
const User=require('../models/user');


module.exports.sendFriendshipRequest=async function(req,res){
    try {
        let from_user=req.user[0];
        let to_user=req.query.id;
        let new_friendship=await Friendship.create({
            to_user:to_user,
            from_user:from_user,
            requestStatus:'Pending'
        })

        let user=await User.findById(from_user);
        user.friendship.push(new_friendship._id);
        user.save();

        let friendUser=await User.findById(to_user);
        friendUser.friendship.push(new_friendship._id);
        friendUser.save();

        req.flash('success','Friend request sent!')
        return res.redirect('back')
    } catch (err) {
        console.log('friends_controllers->sendFriendshipRequest : ' ,err)
        req.flash('error','Error!')
        return res.redirect('back')
    }
};


module.exports.acceptRequest=async function(req,res){
    try {

        let friendship=await Friendship.findById(req.query.id)
        friendship.requestStatus='Accepted';
        friendship.save();
        req.flash('success','Friends request accepeted')    
        return res.redirect('back')
    } catch (err) {
        console.log('friends_controllers->acceptRequest : ' ,err)
        req.flash('error','Error!')
        return res.redirect('back')
    }
}

module.exports.declineRequest=async function(req,res){
    try {
        console.log(req.query)
        if (req.query.requestStatus=='Declined') {
            await Friendship.deleteOne({_id:req.query.id})

            let user=await User.findById(req.query.from_user)
            user.friendship.pull(req.query.id)
            user.save();

            user=await User.findById(req.query.to_user)
            user.friendship.pull(req.query.id)
            user.save();

            req.flash('success','Removed Friendship request')
            return res.redirect('back')
            
        }
        req.flash('error','something went wrong')
        return res.redirect('back')

    } catch (err) {
        console.log('friends_controllers->declineRequest : ' ,err)
        req.flash('error','Error!')
        return res.redirect('back')
    }
}