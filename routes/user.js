const express = require("express");
const {
  Register,
  GetRegister,
  GetUser,
  Login,
  GetLogin,
  Logout,
} = require("../controller/user.js");
const isAuth = require("../middlewares/auth.js");

const router = express.Router();

router.get("/register", GetRegister);
router.post("/register", Register);
router.post("/login", Login);
router.get("/getuser", isAuth, GetUser);
router.get("/login", GetLogin);
router.get("/logout", isAuth, Logout);

module.exports = router;
