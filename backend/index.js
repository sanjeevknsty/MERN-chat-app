const express = require('express')
const dotenv = require('dotenv')
const userRoute = require('./routes/userRoute.js')
const chatRoute = require('./routes/chatRoute.js')
const messageRoute = require('./routes/messageRoute.js')
const {Server} = require('socket.io')
// import { Server } from 'socket.io'
const {createServer} = require("http")
// import {createServer} from 'http'
const cors = require('cors')
const app = express()

const server = createServer(app)
const io = new Server(server,{

  cors:{
    origin : "http://localhost:3000",
    methods:["GET","POST"],
    credentials : true
  }
})

const connectToMongoose = require('./db')

// dotenv.config()
dotenv.config({ path: `${__dirname}/.env` });

connectToMongoose()



app.use(express.json())
app.use(cors())


io.on("connection",(socket)=>{

  socket.on("setup",(user)=>{
    socket.join(user._id)
    socket.emit("connected")
    console.log(user._id + "connected")
  })

  // socket.emit("server", `${socket.id} Welcome to the server`)

  socket.on("join room", (room)=>{
    socket.join(room)
    console.log(room + " room id")
    // socket.to(room).emit("joined",message)
  })

  socket.on("new message",(newMessage)=>{
    var chat  = newMessage.chat
    console.log(chat)
    var users = chat.users
    console.log(users)
    // socket.join(selectedChat._id)
    console.log(socket.rooms)
    // socket.broadcast.emit("message received",newMessage)
    users.forEach((user)=>{

      if(user._id === newMessage.sender._id)
        return 
      socket.to(user._id).emit("message received",newMessage)
    })
  })


  // socket.on("disconnect",()=>{
  //   console.log("disconnected")
  // })
})


app.get('/',(req,res)=>{
  res.send({
    "message" : "hi"
  })
})

app.use('/api/auth',userRoute)
app.use('/api/chat',chatRoute)
app.use('/api/message',messageRoute)


port = process.env.PORT || 6000
server.listen(port,()=>{
  console.log("Express Connected",port)
})
