const { response, request } = require('express')

const getUsers = (req = request, res = response) => {
  res.json({ smg: 'get API' })
}

const updateUser = (req = request, res = response) => {
  const id = req.params.id
  res.json({ smg: 'put API', id })
}

const createUser = (req = request, res = response) => {
  const body = req.body
  res.json({ smg: 'post API', body })
}

const deleteUser = (req = request, res = response) => {
  res.json({ smg: 'delete API' })
}

module.exports = {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
}
