const nodemailer=require('../config/nodemailers');

exports.newComment=(comment)=>{
    let htmlString=nodemailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    nodemailer.transporter.sendMail({
        from:'ankurcodingninja@gmail.com',
        to:comment.user.email,  //sharing to itself
        subject:'Yoyo! Comment Added...',
        html:htmlString,
        // text:'Regards'
    },function(err,info){
        if (err){console.log('error while sending the email : ',err);return}
        // console.log('Email Sent',info)
    })
}