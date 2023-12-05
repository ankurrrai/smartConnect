const express =require('express');
const router=express.Router();



// when we need to use routes js file
router.use('',require('./home'));
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comment',require('./comment'));
router.use('/likes',require('./likes'));
router.use('/friends',require('./friends'));

// api index routes
router.use('/api',require('./api/index'));

module.exports=router