module.exports.home=function(req,res){
    console.log(req.cookies)
    res.cookie('user_pass',10)
    return res.render('home.ejs',{
        title:'Home'
    })
};
