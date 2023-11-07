const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/user_controller');

router.get('/',userController.userHome);
router.get('/profile',passport.checkAuthentication,userController.userProfile);

router.get('/sign-up',userController.signUp);
router.get('/sign-in',userController.signIn);
router.post('/create',userController.create);


// using passport at middilware
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userController.createSession); 

// to signout
router.get('/sign-out',userController.destroySession);

module.exports=router