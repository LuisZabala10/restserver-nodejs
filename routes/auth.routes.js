const express = require('express')
const { check } = require('express-validator')

const router = express.Router()

//contoller
const login = require('../controllers/auth.controller')
const validateFields = require('../middlewares/validate-fields')

router.post(
  '/',
  [
    check('email', 'The email is required').isEmail(),
    check('password', 'The password is required').not().isEmpty(),
    validateFields,
  ],
  login,
)

module.exports = router
