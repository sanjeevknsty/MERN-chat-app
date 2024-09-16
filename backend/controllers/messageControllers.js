const asyncHandler = require("express-async-handler")
const createHttpError = require("http-errors")
const messageModel = require("../models/Message")
const chatModel = require("../models/Chat")
const userModel = require("../models/User")

const chatMessage = asyncHandler(async(req,res,next)=>{
  const {content , chat} = req.body
  // console.log(content,chat)
  if(!content || !chat){
    return next(createHttpError("500","Provide Details"))
  }

  sender = req.user._id
  
  try {
    let message = await messageModel.create({content,chat,sender})
    message = await message.populate("sender", "name profilePicture")
    message = await message.populate("chat")
    // console.log(message)
    message = await userModel.populate(message,{
      path : "chat.users",
      select: "name email profilePicture"
    })
    // console.log(message)
    res.json(message)
  } catch (error) {
    return next(createHttpError("500",error))
  }

})


const allMessages = asyncHandler(async(req,res,next)=>{
  const chatId = req.params.chatId
  // console.log(chatId)
  if(!chatId){
    next(createHttpError(500,"Provide chatId"))
  }
  try {

    let allMessages = await messageModel.find({chat: chatId}).populate("sender", "name profilePicture").populate('chat')
    res.json(allMessages)
    
  } catch (error) {
    next(createHttpError(500,error))
  }
 


})

module.exports = {chatMessage,allMessages}