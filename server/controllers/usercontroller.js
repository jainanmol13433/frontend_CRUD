const User=require('../models/usermodel')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const register= async(req,res)=>{
    try {
       const {Username,Email,Password}=req.body
       const checkUsername=await User.findOne({Username})
       const checkEmail=await User.findOne({Email})
       if(checkUsername){
        return res.json({status:false,msg:"username is already in use choose some other username"})
       }
       else if(checkEmail){
        return res.json({status:false,msg:"email already in use"})
       }
       else{
       const hashPassword=await bcrypt.hash(Password,10)
       const person=await User.create({
        Email,
        Username,
        Password: hashPassword
       })
       delete person.Password
       return res.json({status:true,person})
    }
    } catch (error) {
      return res.json(error) 
    }
}

const login= async(req,res)=>{
    try {
     const {Username,Password}=req.body
     const person=await User.findOne({Username})
     const checkUsername=await User.findOne({Username})
     const passwordvalidity = await bcrypt.compare(Password,person.Password)
     if(!checkUsername){
      return res.json({status:false,msg:"user not found"})
     }
    else if(!passwordvalidity){
      return res.json({status:false,msg:"incorrect password"})
    }
    return res.json({status:true,person})
   } catch (error) {
        return res.status(500).send(error)   
    }
}
const allusers=async(req,res)=>{
try {
  const users=await User.find({_id:{$ne:req.params.id}}).select([
    "Email",
    "Username",
    "_id"
  ])
  return res.json(users)
} catch (error) {
  return res.json(error)
}
}
module.exports={
    register,
    login,
    allusers
}