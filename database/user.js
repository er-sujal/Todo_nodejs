const mongoose = require("mongoose");

const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "Project1_V" })
    .then(() => {
      console.log("Databse connected");
    })
    .catch((e) => {
      e;
    });
};

module.exports = ConnectDB