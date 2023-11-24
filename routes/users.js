const express=require('express');
const router=express.Router();
const passport=require('passport');

const userController=require('../controllers/user_controller');
const resetPassControllers=require('../controllers/reset_pass_controllers');

router.get('/',userController.userHome);
router.get('/profile',passport.checkAuthentication,userController.userProfile);
router.post('/update',passport.checkAuthentication,userController.update); //Update the user detials on user profile page

router.get('/sign-up',userController.signUp); //SignUp page rendering
router.get('/sign-in',userController.signIn); //SignIn page rendering


router.post('/create',userController.create); //Sigup the account


// using passport at middilware
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect:'/users/sign-in'}
),userController.createSession); 

// creating session using google

router.get('/auth/google',passport.authenticate('google',{scope:['profile','email']}))  //according to need take the details and access from google

router.get('/auth/google/callback',passport.authenticate(
    'google',
    {failureRedirect:'/users/sign-in'}
),userController.createSession)

// to signout
router.get('/sign-out',userController.destroySession);


// forget password
router.get('/reset_page',resetPassControllers.resetPage);
router.post('/reset',resetPassControllers.reset);
router.get('/reset_password',resetPassControllers.resetPassword);
router.post('/cred_update',resetPassControllers.newCred)


module.exports=router