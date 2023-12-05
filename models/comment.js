const mongoose=require('mongoose');

const commentSchema=mongoose.Schema(
    {
        content:{
            type:String,
            required:true
        },

        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        post:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        },
        likes:[
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:'Likes'
            }
        ]

    },
    {
        timestamps:true
    }
);

const Comment=mongoose.model('Comment',commentSchema);

module.exports=Comment