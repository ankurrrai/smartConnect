const mongoose=require('mongoose');

const accessTokenSchema=mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    accessToken:{
        type:String,
        required:true
    },
    isValid:{
        type:Boolean,
        require:true
    }
},{timestamps:true});

const AccessToken=mongoose.model('AccessToken',accessTokenSchema);
module.exports=AccessToken;

