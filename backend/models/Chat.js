const { type } = require("@testing-library/user-event/dist/type")
const mongoose = require("mongoose")
const { schema } = require("./User")


const chatSchema  = new mongoose.Schema({
  
  name : {
    type : String,
    trim : true
  },
  isGroup : {
    type : Boolean,
    default : false
  },
  users : [{
    type : mongoose.Schema.Types.ObjectId,
    ref : "user"
  }],
  latestMessage : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "message"
  },
  groupAdmin : {
    type : mongoose.Schema.Types.ObjectId,
    ref : "user"
  },
  profilePicture : {
    type : String,
  }
},
{
  timestamps : true
}

)
const chatModel = mongoose.model("chat",chatSchema)

module.exports = chatModel