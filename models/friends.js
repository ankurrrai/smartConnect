const mongoose=require('mongoose');

const friendshipSchema=new mongoose.Schema({
    from_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    to_user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    requestStatus:{
        type:String,
        required:true,
        enum:['Pending','Accepted','Declined']
    }
},{
    timestamps:true
});

const Friendship=mongoose.model('Friendship',friendshipSchema);
module.exports=Friendship;

