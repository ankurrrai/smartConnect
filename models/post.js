const mongoose=require('mongoose');

const psotSchema=mongoose.Schema(
    {
        content:{
            type:String,
            required:true
        },

        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }

    },
    {
        timestamps:true
    }
);

const Post=mongoose.model('Post',psotSchema);

module.exports=Post