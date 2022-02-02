const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')
const user = require('../models/user')

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query
  // const users = await User.find({ activo: true })
  //   .skip(Number(from))
  //   .limit(Number(limit))

  //getting total number of docuemnts
  // const totals = await User.countDocuments({ active: true })

  const [totals, users] = await Promise.all([
    User.countDocuments({ active: true }),
    User.find({ activo: true }).skip(Number(from)).limit(Number(limit)),
  ])

  res.json({ totals, users })
}

const updateUser = async (req = request, res = response) => {
  const id = req.params.id

  const { _id, password, google, email, ...user } = req.body

  //TODO validar contra la base de dato
  if (password) {
    //encrypt passwork
    const salt = bcryptjs.genSaltSync()
    user.password = bcryptjs.hashSync(password, salt)
  }

  const userUpdated = await User.findByIdAndUpdate({ _id: id }, user)

  res.json({ userUpdated })
}

const createUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body

  const usuario = new User({ name, email, password, role })

  //encrypt passwork
  const salt = bcryptjs.genSaltSync()
  usuario.password = bcryptjs.hashSync(password, salt)
  //save use
  await usuario.save()

  res.status(201).json({ usuario })
}

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params

  //delete
  // const userDeleted = await User.findByIdAndDelete(id)

  //change the status
  const userDelele = await User.findByIdAndUpdate(id, { active: false })

  res.status(204).send();
}

module.exports = {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
}
