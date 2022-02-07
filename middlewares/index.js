const validateFields = require('./validate-fields')
const valdiateJWT = require('./validate-jwt')
const validateRole = require('./validate-roles')

module.exports = {
  ...validateFields,
  ...valdiateJWT,
  ...validateRole,
}
