const mongoose = require("mongoose")


const connectToMongoose =async ()=>{

  try{
    const connect = await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongoose connected${connect.connection.host}`)

  }
  catch(err){ 
    console.log(err.message)
  }

}


module.exports= connectToMongoose