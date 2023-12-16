const nodemailer=require('../config/nodemailers');
const env=require('../config/environment')


        
        
exports.newComment=(accessToken)=>{
    let htmlString=nodemailer.renderTemplate({accessToken:accessToken,mode:env.homeUrl},'/reset_password/reset_password.ejs')
    nodemailer.transporter.sendMail({
        from:env.smartConnect_smtp.auth.user+'@gmail.com',
        to:accessToken.user.email, 
        subject:'Reset the Password',
        html:htmlString,
        // text:'Regards'
    },function(err,info){
        if (err){console.log('error while sending the email : ',err);return}
        // console.log('Email Sent',info)
    })
}