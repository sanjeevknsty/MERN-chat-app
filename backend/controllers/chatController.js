const asyncHandler = require("express-async-handler")
const chatModel = require("../models/Chat")
const createHttpError = require("http-errors")
const userModel = require("../models/User")


const accesschat = asyncHandler(async (req, res, next) => {

  const { userId } = req.body
  // console.log(userId)
  if (!userId) {
    return next(createHttpError(500, "provide UserId"))
  }
  try {

    const chatExists = await chatModel.find({
      isGroup: false,
      $and: [
        { users: { $elemMatch: { $eq: userId } } },
        { users: { $elemMatch: { $eq: req.user._id } } }
      ]
    }).populate('users', '-password')
      .populate('latestMessage')



    if (!chatExists.length) {
      const createChat = await chatModel.create({
        chatName: "sender",
        isGroup: false,
        users: [req.user._id, userId]
      })

      const fullChat = await chatModel.findOne({ _id: createChat._id }).populate('users', '-password')
      // await createChat.populate('users', '-password')
      return res.send(fullChat)
    }
    else {
      return res.send(chatExists)
    }





  } catch (error) {

    return next(createHttpError(500, error.message))
  }
})

const fetchchats = asyncHandler(async (req, res, next) => {
  // const {userId} = req.user


  try {
    const chatExists = await chatModel.find({ users: { $elemMatch: { $eq: req.user._id } } }).populate("users", "-password").populate("groupAdmin", "-password").populate("latestMessage").sort({ updatedAt: -1 })

    if (chatExists.length) {
      return res.send(chatExists)
    }
    else {
      return next(createHttpError(400, "User Does not exists"))
    }
  } catch (error) {
    next(createHttpError(500, error.message))
  }

})


const groupChat = asyncHandler(async (req, res, next) => {
  const { name, users } = req.body
  // console.log(name,users)
  if (!name || !users) {
    return next(createHttpError(400, "Enter all the Fields"))
  }
  users.push(req.user)
  if (users.length < 2) {
    return next(createHttpError(400, "Users should be more than 2 members"))
  }
  try {

    const groupChat = await chatModel.create({
      name,
      isGroup: true,
      users,
      groupAdmin: req.user
    })

    // console.log(groupChat)
    const group = await chatModel.findOne({ _id: groupChat._id }).populate('users', "-password").populate('groupAdmin', "-password")
    return res.send(group)
  } catch (error) {

    next(createHttpError(500, error.message))
  }


})

const rename = asyncHandler(async (req, res, next) => {
  const { id, name } = req.body

  try {
    const findGroup = await chatModel.findByIdAndUpdate({ _id: id }, { name }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")

    return res.send(findGroup)
  } catch (error) {
    return next(createHttpError(500, error.message))
  }

})

const addUserToGroup = asyncHandler(async (req, res, next) => {
  const { userId, groupId } = req.body
  try {
    const group = await chatModel.findByIdAndUpdate({ _id: groupId }, { $push: { users: userId } }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")
    return res.send(group)
  } catch (error) {
    return next(createHttpError(500, error.message))
  }


})


const deleteUser = asyncHandler(async (req, res, next) => {
  const { userId, groupId } = req.body
  // console.log(userId)
  try {
    const group = await chatModel.findByIdAndUpdate({ _id: groupId }, { $pull: { users: userId } }, { new: true }).populate("users", "-password").populate("groupAdmin", "-password")

    return res.send(group)
  } catch (error) {
    return next(createHttpError(500, error.message))

  }
})

module.exports = { accesschat, fetchchats, groupChat, rename, addUserToGroup, deleteUser }