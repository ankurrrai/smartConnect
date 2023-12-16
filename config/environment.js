const fs=require('fs');
const rfs=require('rotating-file-stream');
const path=require('path');

const loggerpath=path.join(__dirname,'../production_log');
fs.existsSync(loggerpath) || fs.mkdirSync(loggerpath);

const accessLogStream=rfs.createStream('access.log',{
    path:loggerpath,
    interval:'1d',
    compress:'gzip'
})


const development={

    name:'development',
    smartConnect_port:8000,
    smartConnect_assetPath:'assests',
    smartConnect_session_screctKey:'smartConnect',
    smartConnect_dbURL:'mongodb://127.0.0.1:27017',
    smartConnect_dbName:'smartConnect_development',
    smartConnect_smtp:{
        service:'gmail',
        host:'smtp.gmail.com',
        port:587,
        secure:false,
        auth:{
            user:process.env.smartConnect_smtp_auth_userName,
            pass:process.env.smartConnect_smtp_auth_pass
        }
    },
    smartConnect_google_clientId:process.env.smartConnect_google_clientId,
    smartConnect_google_screctKey:process.env.smartConnect_google_secrectKey,
    smartConnect_google_callback_url:'http://localhost:8000/users/auth/google/callback',

    smartConnect_jwt_screctKey:'d5Cj3dWx3JcCVgWVmOd54yl68600g8Ze',

    morgan:{
        mode:'dev',
        options:{stream:accessLogStream}
    },
    homeurl:"localhost:8000"
}


const production={
    name:'production',
    smartConnect_port:process.env.smartConnect_port,
    smartConnect_assetPath:process.env.smartConnect_assestPath,
    smartConnect_session_screctKey:process.env.smartConnect_session_serectKey,
    smartConnect_dbURL:process.env.smartConnect_mongodbURL,
    smartConnect_dbName:process.env.smartConnect_mongodb_name,
    smartConnect_smtp:{
        service:process.env.smartConnect_smtp_service,
        host:process.env.smartConnect_smtp_host,
        port:587,
        secure:false,
        auth:{
            user:process.env.smartConnect_smtp_auth_userName,
            pass:process.env.smartConnect_smtp_auth_pass
        }
    },
    smartConnect_google_clientId:process.env.smartConnect_google_clientId,
    smartConnect_google_screctKey:process.env.smartConnect_google_secrectKey,
    smartConnect_google_callback_url:process.env.smartConnect_google_callBackURL,

    smartConnect_jwt_screctKey:process.env.smartConnect_jwtSecrectKey,
    morgan:{
        mode:'combined',
        options:{stream:accessLogStream}
    },
    homeurl:"smartconnect.fun"
}

module.exports=eval(process.env.NODE_ENV)==undefined ? development:eval(process.env.NODE_ENV);