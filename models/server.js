const express = require("express");
const cors = require("cors");

//routes
const userRouter = require("../routes/user.routes");
const authRouter = require("../routes/auth.routes");
const categoriesRouter = require("../routes/categories.routes");
//db conneciton
const dbConnection = require("../database/config.db");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //connect to db
    this.connect();
    //middleware
    this.middlewares();
    //routes
    this.routes();
  }

  //calling the function that connect the app to the db
  async connect() {
    await dbConnection();
  }

  //middlewares
  middlewares() {
    //cors
    this.app.use(cors());
    //public directory
    this.app.use(express.static("public"));
    //enable json
    this.app.use(express.json());
  }

  routes() {
    //users route
    this.app.use("/api/users", userRouter);
    //authentication route
    this.app.use("/api/auth/login", authRouter);
    //categories route
    this.app.use("/api/categories", categoriesRouter);
  }

  start = () => {
    this.app.listen(this.port, () =>
      console.log(`App lintenning on port ${this.port}`)
    );
  };
}

module.exports = Server;
