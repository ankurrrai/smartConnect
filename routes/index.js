const express =require('express');
const router=express.Router();



// when we need to use routes js file
router.use('',require('./home'));
router.use('/users',require('./users'));

module.exports=router