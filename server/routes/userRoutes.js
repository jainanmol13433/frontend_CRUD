const express=require('express')
const  router=express.Router()
const {register,login,allusers} =require('../controllers/usercontroller')
const {messageadd,getmessage} =require('../controllers/messagecontroller')
 
router.post('/register',register)
router.post('/login',login)
router.get('/allusers/:id',allusers)

router.post('/messageadd',messageadd);
router.post('/getmessage',getmessage);

module.exports=router