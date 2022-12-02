const express = require('express')
const cors=require('cors')
const connectDB=require('./db/connect')
const UserRoute=require('./routes/userRoutes')
require('dotenv').config()
const socket=require('socket.io')
const path = require('path')

const app=express()
app.use(express.json())
app.use(cors())

app.use('/',UserRoute)

const port =process.env.PORT||process.env.API_PORT

var http = require ("http") . createServer (app) ;
const start=async()=>{
    try {
       await connectDB(process.env.MONGO_URI)
        const server=http.listen(port,()=>{
            console.log(`connected to port ${port}`)
        })

        const usersOnline=new Map(); 

        const io=socket(server,{
            cors:{
            origin:[process.env.ORIGIN],
            methods:"GET"
            }
        })
        io.on("connection" ,(socket)=>{
            socket.on("useradd",(User_id)=>{
                usersOnline.set(User_id,socket.id)
            })

            socket.on('send',(data)=>{  // message send by the user1
                const getuser=usersOnline.get(data.to)
                if(getuser){
                    socket.to(getuser).emit("recieve",data.message)  // message recived by user2
                }
            })
         }
        )
            } catch (error) {
                console.log(error)
            }
}
start()