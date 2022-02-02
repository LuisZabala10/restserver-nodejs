const User = require('../models/user')
const Role = require('../models/role')

const isValidRole = async (role = '') => {
  const existsRole = await Role.findOne({ role })
  if (!existsRole) {
    throw new Error(
      `The role ${role} doesn't exist in the database. Provide a valid role`,
    )
  }
}

const existsEmail = async (email = '') => {
  const exists = await User.findOne({ email: email })

  if (exists) {
    throw new Error(`'The email ${email} already exists`)
  }
}

const existsUserById = async (id = '') => {
  const exists = await User.findById({ _id: id })

  if (!exists) {
    throw new Error(`'The user with ${id} doesn't exists`)
  }
}

module.exports = {
  isValidRole,
  existsEmail,
  existsUserById
}
