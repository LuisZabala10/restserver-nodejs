const bcryptjs = require("bcryptjs");
const { request } = require("express");
const { response } = require("express");
const generateJWT = require("../helpers/generate-jwt.js");
const { googleVerify } = require("../helpers/google-verify");

//model
const User = require("../models/user");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    //check if email exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: "User or Password incorrect",
      });
    }

    //check if user is active
    if (!user.active) {
      return res.status(400).json({
        msg: "User or Password incorrect - inactive",
      });
    }

    //chech the password
    const isValidPassword = bcryptjs.compareSync(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({
        msg: "User or Password incorrect - password",
      });
    }

    //Generate token
    const token = await generateJWT(user._id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ msg: "Something went wrong contact the administrator." });
  }
};

const googleSignIn = async (req = request, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      //create the user
      const data = {
        name,
        email,
        password: "",
        role: "USER_ROLE",
        google: true,
      };

      user = new User(data);
      await user.save();
    }

    //if user is not active
    if (!user.active) {
      return res
        .status(401)
        .json({ msg: "The user you are trying to login is not active." });
    }

    const token = await generateJWT(user._id);

    res.json({ user, token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "The token cannot be verified." });
  }
};

module.exports = { login, googleSignIn };
