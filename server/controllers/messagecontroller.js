const Message=require('../models/messagemodel')
const messageadd=async(req,res)=>{
try {
    const {from,to,message}=req.body;
    const dataEntry=await Message.create({
        message:{text:message},
        users:[from,to],
        sender:from
    })
    if(dataEntry){
        return res.json("message added")
    }
    return res.json('message failed')
} catch (error) {
    return res.json(error) 
}
}

const getmessage=async(req,res)=>{
try {
    const {from,to}=req.body;
const message=await Message.find({
    users:{
        $all:[from,to]
    }
}).sort({updatedAt:1})
const showmessage=message.map((msg)=>{
    return{
    fromMe:msg.sender.toString()===from,
    Message:msg.message.text
    }
})    
res.json(showmessage);
} catch (error) {
    return res.json(error)    
}
}

module.exports={
    messageadd,
    getmessage
}