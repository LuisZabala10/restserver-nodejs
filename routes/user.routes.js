const express = require('express')
const router = express.Router()

//controller
const {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
} = require('../controllers/user.controller')

router.get('/', getUsers)

router.put('/:id', updateUser)

router.post('/', createUser)

router.delete('/:id', deleteUser)

module.exports = router
