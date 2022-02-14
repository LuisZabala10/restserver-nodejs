const express = require('express')
const { check } = require('express-validator')

const router = express.Router()

//contoller
const { login, googleSignIn } = require('../controllers/auth.controller')
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

router.post(
  '/google',
  [
    check('id_token', 'Google token is required').not().isEmpty(),
    validateFields,
  ],
  googleSignIn,
)

module.exports = router
