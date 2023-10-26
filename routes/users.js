const express=require('express');
const router=express.Router();
const userController=require('../controllers/user_controller');

router.get('/',userController.userHome);
router.get('/profile',userController.userProfile);

module.exports=router