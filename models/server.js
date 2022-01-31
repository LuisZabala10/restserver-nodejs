const express = require('express')
const cors = require('cors')

//my exports
const userRoutes = require('../routes/user.routes')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT

    //middleware
    this.middlewares()
    //routes
    this.routes()
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
