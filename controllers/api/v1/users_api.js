
const User=require('../../../models/user');
const jwt=require('jsonwebtoken');

module.exports.createSession=async function(req,res){
    try {
        let user=await User.findOne({email:req.body.email})
        if (!user || user.password!=req.body.password){
            return res.status(422).json({
                message:'Inavlid user name or password!',
            })
        }

        return res.status(200).json({
            message:'success',
            data:{
                token:jwt.sign(user.toJSON(),'smartConnect',{expiresIn:'100000'})
            }
        })

    } catch (err) {
        return res.status(500).json({
            message:'Error : ' + err
        })
    }
}