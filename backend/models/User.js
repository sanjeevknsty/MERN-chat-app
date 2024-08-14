const { type } = require("@testing-library/user-event/dist/type")
const mongoose = require("mongoose")

const userSchema =new mongoose.Schema({
  name : {
    type : String,
    required : true

  },
  email : {
    type : String,
    required : true,
    unique : true
  },
  password : {
    type : String,
    required : true,
  },
  profilePicture : {
    type : String,
    default : "https://thumbs.dreamstime.com/b/default-avatar-profile-vector-user-profile-default-avatar-profile-vector-user-profile-profile-179376714.jpg"
  }

},
{
  Timestamp : true
}

)

const userModel = mongoose.model("user",userSchema)

module.exports = userModel