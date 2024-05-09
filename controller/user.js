const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const setCookies = require("../utils/fetures.js");
const jwt = require("jsonwebtoken");
const { errorhendler } = require("../middlewares/error.js");

const Register = async (req, res, next) => {
  try {
    console.log("at")
    const { name, email, password } = req.body;

    let utest = await User.findOne({ email });

    if (utest) return next(new errorhendler("Non user found", 400));

    // if (await User.findOne({ email })) {
    //   return res.status(404).json({
    //     success: false,
    //     massege: "User alrady exists eith this mail addaress please do login",
    //   });
    // }

    const HashedPass = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: HashedPass,
    });

    setCookies(user, res, "User Created", 201);
  } catch (error) {
    next(error);
  }
};

const GetRegister = (req, res) => {
  res.render("register");
};

const GetUser = async (req, res, next) => {
  // const { id } = req.params;

  try {
    const user = req.user;
    if (user) {
      res.json({
        success: true,
        message: "User found",
        user,
      });
    } else {
      return next(new errorhendler("No user found", 400));
      // res.json({
      //   success: false,
      //   message: "No user found",
      // });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const Login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email }).select("+password");
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        setCookies(user, res, `Welcome , ${user.name}`, 200);
        // res.redirct("/success");
      } else {
        res.send("Invalid Details");
      }
    } else {
      res.send("please register");
    }
  } catch (error) {
    next(error);
  }
};

const GetLogin = (req, res) => {
  res.render("login");
};

const Logout = (req, res) => {
  res
    .status(200)
    .clearCookie("token", {
      // sameSite: process.env.NODE_MODE == "Devlopment" ? "lex" : "none",
      // secure: process.env.NODE_MODE == "Devlopment" ? false : true,
    })
    .json({
      success: true,
    });
};

module.exports = { Register, GetRegister, GetUser, Login, GetLogin, Logout };
