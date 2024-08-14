const express = require('express')
const dotenv = require('dotenv')
const userRoute = require('./routes/userRoute.js')
const chatRoute = require('./routes/chatRoute.js')
const cors = require('cors')
const app = express()
const connectToMongoose = require('./db')

// dotenv.config()
dotenv.config({ path: `${__dirname}/.env` });

connectToMongoose()



app.use(express.json())
app.use(cors())


app.get('/',(req,res)=>{
  res.send({
    "message" : 
      "hi"
  })
})

app.use('/api/auth',userRoute)
app.use('/api/chat',chatRoute)


port = process.env.PORT || 6000
app.listen(port,()=>{
  console.log("Express Connected",port)
})