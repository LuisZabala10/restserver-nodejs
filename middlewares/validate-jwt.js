const { response } = require('express')
const { request } = require('express')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const valdiateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token')

  if (!token) {
    return res.status(401).json({ msg: 'missing token' })
  }

  //validate token
  try {
    //if token is invalid throw an error
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY)

    //read the current user
    const user = await User.findById({ _id: uid })

    //check if user does not exist
    if(!user){
      return res.status(401).json({
        msg: 'Invalid token - user does not exist'
      })
    }

    //check if the current user is not deleted yet
    if(!user.active){
      return res.status(401).json({
        msg: 'User unauthorized'
      })
    }

    req.currentUser = user

    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ msg: 'Inavalid jwt' })
  }
}

module.exports = valdiateJWT
