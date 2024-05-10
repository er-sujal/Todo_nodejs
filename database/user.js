const mongoose = require("mongoose");

const ConnectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, { dbName: "Project1_V" })
    .then((c) => {
      console.log(`Databse connected ${c.connection.host}`);
    })
    .catch((e) => {
      e;
    });
};

module.exports = ConnectDB;
