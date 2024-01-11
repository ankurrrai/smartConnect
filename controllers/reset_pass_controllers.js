const crypto=require('crypto');
const AccessToken=require('../models/accesstoken');
const User=require('../models/user');

// const queue=require('../config/kue');
// const resetPassWorker=require('../workers/reset_password_worker');

const resetPassMailer=require('../mailers/reset_password_mailers')

module.exports.resetPage=function(req,res){
    return res.render('reset_user_form.ejs',{
        title:'Forget Password Page'
    });
}

module.exports.reset=async function(req,res){
    try {
        let user=await User.findOne({email:req.body.email})
        if (user){
            let accessToken=await AccessToken.create({
                user:user._id,
                accessToken:crypto.randomBytes(20).toString('hex'),
                isValid:true
            });
            accessToken=await AccessToken.findOne({accessToken:accessToken.accessToken}).populate('user');
            resetPassMailer.resetPass(accessToken);
            // let job=queue.create('resets',accessToken).save(function(err){
            //     if (err){console.log('reset_password_controllers : Error in sending queue ',err);return;}

            //      console.log('reset_password_controllers: job Enqueued - ',job.id)
            // })
            req.flash('success','Reset link shared to your email.')
            res.redirect('/')

        } else {
            req.flash('error','This email is not registered. Kindly Use regieterd email or signup with this email..');
            res.redirect('back')
        }
    } catch (err) {
        req.flash('error',err)
        console.log(`Error in resetController -> reset`)
        console.log(`Error Description ${err}`)
        return res.redirect('back')   
    }
}


module.exports.resetPassword=async function(req,res){
    try {
        let queryAccessToken=req.query.accessToken;
        let accessToken= await AccessToken.findOne({accessToken:queryAccessToken})
        let createdat=new Date(accessToken.createdAt)
        let now=new Date()
        // let timeout= Math.abs(now - createdat)<=(1000*60*10);
        
        if (accessToken && (Math.abs(now - createdat)<=(1000*60*10)) && accessToken.isValid){
        
            return res.render('user-reset-password.ejs',{
                title:'Reset',
                accessToken:accessToken
            })
        }else{
            return res.send('<h1> This link is no longer valid! </h1>')
        }
            
    } catch (err) {
        req.flash('error',err)
        console.log(`Error in resetController -> resetPassword`)
        console.log(`Error Description ${err}`)
        return res.redirect('back')
    }
}


module.exports.newCred=async function(req,res){
    try {

        if(req.body.confirm_password!=req.body.password){
            req.flash('error','Password is not valid')
            return res.redirect('back')
        }

        let accessToken=await AccessToken.findOne({accessToken:req.body.accessToken})
        if (accessToken){
            let user=await User.findById(accessToken.user)
            user.password=req.body.password
            accessToken.isValid=false
            accessToken.save();
            user.save();

            req.flash('success','Password Changed Successfully!')
            return res.redirect('/')
        }else{
            return res.send('<h1> Something went wrong. Kindly Retry! </h1>')
        }
    } catch (err) {
        req.flash('error',err)
        console.log(`Error in resetController -> newCred`)
        console.log(`Error Description ${err}`)
        return res.redirect('back')
    }
}