const express = require('express')
const cors = require('cors')

//my exports
const userRoutes = require('../routes/user.routes')
const dbConnection = require('../database/config.db')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    //connect to db
    this.connect()
    //middleware
    this.middlewares()
    //routes
    this.routes()
  }

  //calling the function that connect the app to the db
  async connect() {
    await dbConnection()
  }

  //middlewares
  middlewares() {
    //cors
    this.app.use(cors())
    //public directory
    this.app.use(express.static('public'))
    //enable json
    this.app.use(express.json())
  }

  routes() {
    //users routes
    this.app.use('/api/users', userRoutes)
  }

  start = () => {
    this.app.listen(this.port, () =>
      console.log(`App lintenning on port ${this.port}`),
    )
  }
}

module.exports = Server
