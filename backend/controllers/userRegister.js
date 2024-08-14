const userModel = require("../models/User")
const asyncHandler = require('express-async-handler')
const generateToken = require("../generateToken")
const bycrpt = require("bcryptjs")
var createError = require('http-errors')

const userSignup = asyncHandler(async (req, res, next) => {
  const { email, password, name,profilePticture} = req.body
  console.log(email,password)
  if (!email || !password || !name) {
    return next('400', "Enter Valid Credentials")
  }

  try {
    const userExists = await userModel.findOne({ email })

    if (!userExists) {
      const salt = await bycrpt.genSalt(10)
      const securePassword = await bycrpt.hash(password, salt)

      const user = await userModel.create({
        email,
        password: securePassword,
        name,
        profilePticture
      })

      const token = generateToken(user._id)
      return res.status(200).json({_id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic, token})

    }
    else {

      return next(createError('400', "User Exists"))
    }

  }

  catch (err) {
    return next(createError('500', err.message))
  }

})


const userLogin = asyncHandler(async (req, res, next) => {

  const { email, password } = req.body
  console.log(email,password)

  try {

    const userExists = await userModel.findOne({ email })

    if (userExists) {
      const verifyPassword = await bycrpt.compare(password, userExists.password)
      if (!verifyPassword) {
        return next(createError(400, "Wrong Password"))
      }
      const token = generateToken(userExists._id)
      const data = {
        _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      isAdmin: userExists.isAdmin,
      pic: userExists.pic,
      token
      }
      return res.status(200).send(data)
    }
    else{
      return next(createError('400',"User Does Not Exists"))
    }
  }
  catch (err) {
    console.log("error")
    return next(createError('500', "user not in data base"))
  }

})

const searchUser = asyncHandler( async(req,res,next) =>{
try {
  const searchName = req.query.search ? {
    $or :[
      {name : {$regex : req.query.search , $options : "i"}},
      {email : {$regex: req.query.search ,$options : "i"}},
    ]
  } : {};
  console.log(searchName)


  const user = await userModel.find(searchName).find({_id : {$ne : req.user._id}})
  // console.log(user)
  return res.status(200).send(user)
  
} catch (error) {
  return next(createError(500,error.message))
}
  
  

})

module.exports = { userSignup, userLogin ,searchUser}