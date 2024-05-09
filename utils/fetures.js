const jwt = require("jsonwebtoken");

const setCookies = (user, res, massege, statusCode = 200) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWTSECRATE);
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_MODE === "Development" ? "lex" : "None",
      secure: process.env.NODE_MODE === "Development" ? false : true,
    })
    .json({
      Sucsesss: true,
      massege,
    });
};

module.exports = setCookies;
