const mongoose = require('mongoose');
const env=require('./environment')


main().catch(function(err){
    console.log(`Error while connection with db ${err}`)
})

// coonect to db
async function main (){
    mongoose.connect(`${env.smartConnect_dbURL}`)
}

// accuire the db
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error while establish the connect with db'));
db.once('open',function(){
    console.log('Connection has eastablished with db!')
})

module.exports=db