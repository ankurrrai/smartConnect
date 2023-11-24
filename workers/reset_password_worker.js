const queue=require('../config/kue');
const commentsMailer=require('../mailers/reset_password_mailers');

queue.process('resets',function(job,done){
    console.log('resets worker is processing a job',job.data)
    commentsMailer.newComment(job.data)
    done();
})
