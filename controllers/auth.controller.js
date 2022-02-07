const bcryptjs = require('bcryptjs')
const { request } = require('express')
const { response } = require('express')
const generateJWT = require('../helpers/generate-jwt.js')

//model
const User = require('../models/user')

const login = async (req = request, res = response) => {
  const { email, password } = req.body

  try {
    //check if email exist
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({
        msg: 'User or Password incorrect',
      })
    }

    //check if user is active
    if (!user.active) {
      return res.status(400).json({
        msg: 'User or Password incorrect - inactive',
      })
    }

    //chech the password
    const isValidPassword = bcryptjs.compareSync(password, user.password)
    if (!isValidPassword) {
      return res.status(400).json({
        msg: 'User or Password incorrect - password',
      })
    }

    //Generate token
    const token = await generateJWT(user._id)

    res.json({ user, token })
  } catch (error) {
    console.log(error)
    res
      .status(500)
      .json({ msg: 'Something went wrong contact the administrator.' })
  }
}

module.exports = login
