const express=require('express');
const router=express.Router();

// when we need to use controller-1
const homeController=require('../controllers/home_controller');

// to use controller function inside the routes -2
router.get('/',homeController.home);


module.exports=router;