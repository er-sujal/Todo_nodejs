const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const isAuth = async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) {
    return res.status(404).json({
      success: false,
      massege: "Do login",
    });
  }

  const decoded = jwt.verify(token, process.env.JWTSECRATE);

  req.user = await User.findById(decoded._id);
  next();
};

module.exports = isAuth;
