const express=require('express');
const router=express.Router();

const friendshipController=require('../controllers/friends_controllers');

// router.get('/sendrequest',friendshipController.home)
router.get('/sendrequest',friendshipController.sendFriendshipRequest);
router.get('/destroyrequest',friendshipController.declineRequest)
router.get('/acceptrequest',friendshipController.acceptRequest)

module.exports=router