const { response } = require('express')
const { request } = require('express')

const isAdmin = (req = request, res = response, next) => {
  if (!req.currentUser) {
    return res.status(500).json({
      msg: 'token must be validate fist',
    })
  }

  const currentUser = req.currentUser

  if (currentUser.role !== 'ADMIN_ROLE') {
    res
      .status(401)
      .json({ msg: 'You have not permision to perform this action' })
  }

  next()
}

const hasRole = (...roles) => {

  return (req= request,res= response,next=next)=>{
    if (!req.currentUser) {
      return res.status(500).json({
        msg: 'token must be validate fist',
      })
    }
    const currentUser = req.currentUser

    if(!roles.includes(currentUser.role)){
      return res
        .status(401)
        .json({ msg: 'You have not permision to perform this action' })
    }

    next();
  }
}

module.exports = {isAdmin,hasRole}
