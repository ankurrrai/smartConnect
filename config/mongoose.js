const mongoose = require('mongoose');

main().catch(function(err){
    console.log(`Error while connection with db ${err}`)
})

// coonect to db
async function main (){
    mongoose.connect('mongodb://127.0.0.1:27017/smartConnect_development')
}

// accuire the db
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error while establish the connect with db'));
db.once('open',function(){
    console.log('Connection has eastablished with db!')
})

module.exports=db