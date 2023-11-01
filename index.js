const express=require('express');
const app=express();
const port=8000;

// setup the url encoded
app.use(express.urlencoded());

// setupp the cookie parser
const cookieParser=require('cookie-parser');
app.use(cookieParser());

// setup the static file
app.use(express.static('./assests'))


// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// setup the layouts
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);

// extract styles and scripys frpm subpages to the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

// use express router
app.use('/',require('./routes/index'));


// setup the db
const db=require('./config/mongoose');
const User=require('./models/user')

app.listen(port,function(err){
    if(err){
        console.log(`Error in running server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`)
});

