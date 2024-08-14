const express = require("express")
const { body} = require('express-validator')
const {userSignup,userLogin, searchUser} = require("../controllers/userRegister")
const authToken = require("../middleware/authToken")
const router = express.Router()


router.post('/signup',
[
  body('name',"Enter Valid Name").isLength({min : 3}),
  body('email',"Enter Valid Name").isEmail(),
  body('password', "Enter Valid Password").isLength({min : 3})
], userSignup)

router.post('/login',userLogin)

router.get('/search',authToken,searchUser)


module.exports = router