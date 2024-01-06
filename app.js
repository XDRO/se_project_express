const express = require("express");

const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();

const globalErrorHandler = require("./controllers/errorController");

const auth = require("./middlewares/auth");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {})
  .catch();

const routes = require("./routes");

app.use(express.json());

// old code below
app.use((req, res, next) => {
  req.user = { _id: req.user._id };
  next();
});

app.use(routes, auth, require("./routes/index"));

app.use(globalErrorHandler);

app.listen(PORT, () => {});

// run in gitbash to start database "C:\Program Files\MongoDB\Server\5.0\bin\mongod.exe" --dbpath="c:\data"
// const fs = require("fs");
// let users = JSON.parse(fs.readFileSync("/users"));

// const users = require("./user");

// GET - users/me, I need to retrieve the current user here, maybe I can just use the getCurrentuser
// app.get("/users/me", (req, res) => {
//   res.status(200).json({
//     status: "success",
//     data: {
//       users: users,
//     },
//   });
// });
