class errorhendler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

const errorHendler = (err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
};

module.exports = { errorHendler, errorhendler };
