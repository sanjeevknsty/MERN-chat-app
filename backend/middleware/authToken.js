const createHttpError = require("http-errors")
const jwt = require('jsonwebtoken')
const userModel = require("../models/User")

const authToken = async (req, res, next) => {
  const authToken = req.headers.authorization
    if (authToken && authToken.startsWith("Bearer")) {
      try {
        const token = authToken.split(' ')[1]

        const verifyId = jwt.verify(token, process.env.SECRET_KEY)
        req.user = await userModel.findById(verifyId.id).select('-password')
        next()

      } catch (error) {
        next(createHttpError(400, error.message))

      }
    }
      else{
        next(createHttpError(400, "Error Occured"))

      }

 

}

module.exports = authToken