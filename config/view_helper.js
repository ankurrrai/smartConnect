const path = require('path');
const env =require('./environment');
const fs=require('fs');

module.exports=function(app){
    app.locals.assespath=function(filepath){
        if (env.name=='development') {
            return '/'+filepath
        }
        
        return '/'+ JSON.parse(fs.readFileSync(path.join(__dirname,'../public/assests/rev-manifest.json')))[filepath];
    }
    
}