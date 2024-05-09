const express = require("express");
const ConnectDB = require("./database/user.js");
const bodyparser = require("body-parser");
const UserRouter = require("./routes/user.js");
const TaskRouter = require("./routes/task.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const { errorHendler, errorhendler } = require("./middlewares/error.js");
const cors = require("cors");

const app = express();
dotenv.config({
  path: "./database/config.env",
});

app.use(
  cors({
    origin: [process.env.FRONT_URI],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use("/user", UserRouter);
app.use("/task", TaskRouter);
app.set("view engine", "ejs");

ConnectDB();

app.use(errorHendler);
app.use(errorhendler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running ON PORT ${process.env.PORT} in ${process.env.NODE_MODE} Mode`);
});
