const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('database connect')
  } catch (error) {
    console.log(error)
    throw new Error('Error trying to connect with the dabatase')
  }
}

module.exports = dbConnection
