const jwt = require('jsonwebtoken')

const generateToken = (id)=>{

  const token = jwt.sign({id},process.env.SECRET_KEY,{algorithm:'HS256'},{expiresin : '30d'})

  return token 
}

module.exports = generateToken