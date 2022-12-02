const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
Username:{
    type:String,
    require:true,
    unique:true,
    min:5,
    max:32
},
Email:{
  type:String,
  require:true,
  unique:true
},
Password:{
    type:String,
    require:true
},
})

module.exports=mongoose.model('User',userSchema)