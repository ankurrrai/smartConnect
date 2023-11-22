const express=require('express');
const app=express();
const port=8000;
const session=require('express-session');
// setup the url encoded
app.use(express.urlencoded());

// setupp the cookie parser
const cookieParser=require('cookie-parser');
app.use(cookieParser());

// // set up the SAAS for styling
// const sassMiddleware=require('node-sass-middleware');
// app.use(sassMiddleware({
//     src:'./assests/scss',
//     dest:'./assests/css',
//     debug:true,
//     outputStyle:'extended', //extended
//     prefix:'/css'
// }));

// setup the static file
app.use(express.static('./assests'))

// Give the path for uploads
app.use('/uploads',express.static(__dirname + '/uploads'))

// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

// setup the layouts
const expressLayouts=require('express-ejs-layouts');
app.use(expressLayouts);


// extract styles and scripts from subpages to the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);



// setup the passport
const passport=require('passport');
const passportLocal=require('./config/passport-local-strategy');

// Intialize the JWT
const passportJWT=require('./config/passport-jwt-startegy');

// Intialize the google
const passportGoogle=require('./config/passport-google-auth2-strategy');

const MongoStore = require('connect-mongo'); //To store the session


app.use(session({
    name:'smartConnect',
    // todo change the secret before in production mode
    secret:'Hvae to do this dynamic',
    saveUninitialized:false,
    resave:false,
    cookie:{
        maxAge:(1000*60*100),
    },
    store:MongoStore.create(    
        {
            mongoUrl:'mongodb://127.0.0.1:27017/smartConnect_development' //have to read the documentation
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

// setup the connect-flash
const flash=require('connect-flash');
const cusstomMdwr=require('./config/customMiddleware');
app.use(flash());
app.use(cusstomMdwr.setFlash);



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

