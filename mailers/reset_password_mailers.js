const nodemailer=require('../config/nodemailers');

exports.newComment=(accessToken)=>{
    let htmlString=nodemailer.renderTemplate({accessToken:accessToken},'/reset_password/reset_password.ejs')
    nodemailer.transporter.sendMail({
        from:'ankurcodingninja@gmail.com',
        to:accessToken.user.email, 
        subject:'Reset the Password',
        html:htmlString,
        // text:'Regards'
    },function(err,info){
        if (err){console.log('error while sending the email : ',err);return}
        // console.log('Email Sent',info)
    })
}