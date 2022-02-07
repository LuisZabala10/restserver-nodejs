const express = require('express')
const { check } = require('express-validator')
const router = express.Router()

//controller
const {
  getUsers,
  updateUser,
  createUser,
  deleteUser,
} = require('../controllers/user.controller')
//validations
const validateFields = require('../middlewares/validate-fields')
const valdiateJWT = require('../middlewares/validate-jwt')
const { isAdmin, hasRole } = require('../middlewares/validate-roles')

const {
  isValidRole,
  existsEmail,
  existsUserById,
} = require('../helpers/dbValidators')

router.get('/', getUsers)

router.put(
  '/:id',
  [
    check('id', 'You must provide a valid id').isMongoId(),
    check('id').custom(existsUserById),
    //check if user provide a valid role
    check('role').custom(isValidRole),
    validateFields,
  ],
  updateUser,
)

router.post(
  '/',
  [
    check('name', 'You must provide name').not().isEmpty(),
    check('password', 'password must be more than 6 characters').isLength({
      min: 6,
    }),
    check('email', 'You must provide a valid email').isEmail(),
    // check('role', 'You must provide a valid role').isIn([
    //   'ADMIN_ROLE',
    //   'USER_ROLE',
    // ]),
    //check if user provide a valid role
    check('role').custom(isValidRole),
    //check if email exists
    check('email').custom(existsEmail),
    //this middleware is use to check if any of our validation fail
    validateFields,
  ],
  createUser,
)

router.delete(
  '/:id',
  [
    valdiateJWT,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'You must provide a valid id').isMongoId(),
    check('id').custom(existsUserById),
    validateFields,
  ],
  deleteUser,
)

module.exports = router
