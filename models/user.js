const mongoose =require('mongoose');

// setting up the multer to collect the pictures and file
const multer=require('multer');
const path=require('path');
const AVATAR_PATH=path.join('/uploads/users/avatars')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        reuired:true,
        unique:true
    },
    password:{
        type:String,
        reuired:true
    },
    name:{
        type:String,
        reuired:true
    },
    avatar:{
        type:String
    },
    friendship:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Friendship'
        }
    ]

},{
    timestamps:true
});

// Multer Storage which could be in cloud and local as of now using local   
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,'..',AVATAR_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

userSchema.statics.uploadedAvatar=multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath=AVATAR_PATH;

const User=mongoose.model('User',userSchema);
module.exports=User;